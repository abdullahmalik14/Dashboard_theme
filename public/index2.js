class ChartsHandler {
  constructor(options = {}) {
    this._rootById = new Map();
    this._opts = Object.assign(
      {
        selectors: {
          bodyConfig: 'script#charts-config[type="application/json"]',
          container: ".chart-container,[data-chart-id]",
          chartHost: '.amchart,[data-role="chart"]',
        },
      },
      options
    );
    this._configs = { base: {}, data: {} };
    this.currentToggleRoot = null;
    this.charts = ["bar", "line"];
    this.currentIndex = 0;
  }
async initChartManager() {
  const ok = await this.loadConfigs();
  if (!ok) return;
  const initialTargets = document.querySelectorAll('.chart-container[data-initial-render="true"]');
  for (const container of initialTargets) {
    const host = container.querySelector(this._opts?.selectors?.chartHost || ".amchart");
    if (!host) continue;
    container.removeAttribute("hidden");
    host.innerHTML = "";
    await this.renderSingleChart(container);
  }
  this.setupEventListeners();
  this._initEventBridge(); // <-- critical
  console.log("[ChartManager] initChartManager ready");
}
  async loadConfigs() {
    const cfgEl = document.querySelector(this._opts.selectors.bodyConfig);
    if (!cfgEl) {
      console.error("[ChartsHandler] missing #charts-config");
      return false;
    }
    let cfg;
    try {
      cfg = JSON.parse(cfgEl.textContent);
    } catch (e) {
      console.error("[ChartsHandler] invalid #charts-config", e);
      return false;
    }
    try {
      const [baseConfigs, datasets] = await Promise.all([
        this._fetchJSON(cfg.baseConfigsSrc),
        this._fetchJSON(cfg.datasetsSrc),
      ]);
      this._configs.base = baseConfigs || {};
      this._configs.data = datasets || {};
      return true;
    } catch (e) {
      console.error("[ChartsHandler] failed loading configs/data", e);
      return false;
    }
  }
  async renderToggleChart(type) {
    const wrapper = document.getElementById("chartWrapper");
    if (!wrapper) return;
    const containerEl = wrapper.querySelector(
      ".chart-container[data-chart-config]"
    );
    if (!containerEl) return;
    const chartId = containerEl.getAttribute("data-chart-id") || "toggle-chart";
    this._disposeChart(chartId);
    const cfg = this._parseJSONAttr(containerEl, "data-chart-config") || {};
    cfg.type = type;
    containerEl.setAttribute("data-chart-config", JSON.stringify(cfg));
    const title = document.getElementById("chartTitle");
    if (title) title.textContent = "Earnings Trends";
    await this.renderSingleChart(containerEl);
    this.currentToggleRoot = this._rootById.get(chartId);
    this.updateToggleButton();
  }
  _disposeChart(chartId) {
    const prevRoot = this._rootById.get(chartId);
    if (prevRoot?.dispose) prevRoot.dispose();
    this._rootById.delete(chartId);
  }
  _createCodePenTooltip(root, customAdapter = null) {
    const tooltip = am5.Tooltip.new(root, {
      background: am5.RoundedRectangle.new(root, {
        fill: am5.color(0xffffff),
        shadowColor: am5.color(0xe2e2e2),
        shadowBlur: 8,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
      }),
    });
    tooltip.get("background").setAll({
      cornerRadiusTL: 2,
      cornerRadiusTR: 2,
      cornerRadiusBL: 2,
      cornerRadiusBR: 2,
    });
    tooltip.label.setAll({
      textType: "bbcode",
      fontFamily: "Poppins, sans-serif",
      fontSize: "0.75rem",
      fill: am5.color(0x344054),
      textAlign: "left",
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0,
    });
    if (customAdapter) tooltip.label.adapters.add("text", customAdapter);
    return tooltip;
  }
  _setupChartCursor(chart, root) {
    const cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, { behavior: "none" })
    );
    cursor.lineY.set("visible", false);
    cursor.lineX.set("visible", false);
    return cursor;
  }
  _createXYChart(root, styleCfg, option = { chartType: "XYChart" }) {
    const padLeft = styleCfg.padding?.left ?? 0;
    const padTop = styleCfg.padding?.top ?? styleCfg.plotTopPaddingPx ?? 8;
    return root.container.children.push(
      am5xy[option.chartType].new(root, {
        panX: false,
        panY: false,
        wheelX: "none",
        wheelY: "none",
        paddingLeft: padLeft,
        paddingRight: styleCfg.padding?.right ?? 0,
        paddingTop: padTop,
        paddingBottom: styleCfg.padding?.bottom ?? 60,
        maxTooltipDistance: -1,
        ...option,
      })
    );
  }
  _createAxes(chart, root, fields, styleCfg) {
    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: fields.category,
        renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 30 }),
      })
    );
    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
        min: styleCfg.yAxis?.min,
        strictMinMax: !!styleCfg.yAxis?.strict,
      })
    );
    yAxis.setAll({
      extraMax:
        styleCfg.yAxis?.extraHeadroom != null
          ? styleCfg.yAxis.extraHeadroom
          : 0,
    });
    const axisLabelColor = am5.color(styleCfg.axisLabelColor || 0x475467);
    const axisLabelSize = styleCfg.axisLabelFontSize || "12px";
    [xAxis, yAxis].forEach((axis) => {
      axis.get("renderer").labels.template.setAll({
        fontSize: axisLabelSize,
        fill: axisLabelColor,
      });
      axis.get("renderer").grid.template.setAll({ visible: false });
    });
    if (styleCfg.yAxis?.label) {
      yAxis.children.unshift(
        am5.Label.new(root, {
          text: styleCfg.yAxis.label.text || "",
          rotation: -90,
          fontSize: styleCfg.yAxis.label.fontSize || 14,
          fontWeight: styleCfg.yAxis.label.fontWeight || "bold",
          fill: axisLabelColor,
          y: am5.p50,
          centerX: am5.p50,
        })
      );
    }
    return { xAxis, yAxis };
  }
  _seriesColorFromHTML(styleCfg, key, index) {
    const fromSeries = styleCfg.seriesStyles?.[key]?.color;
    if (fromSeries) return am5.color(fromSeries);
    const palette = Array.isArray(styleCfg.palette) ? styleCfg.palette : null;
    if (palette && palette.length)
      return am5.color(palette[index % palette.length]);
    return null;
  }
  _createColumnSeries(chart, root, key, styleCfg, fields, xAxis, yAxis, color) {
    const label = styleCfg.seriesLabels?.[key] || key;
    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: label,
        stacked: !!styleCfg.stacked,
        xAxis,
        yAxis,
        valueYField: key,
        categoryXField: fields.category,
      })
    );
    const widthPct =
      styleCfg.bar?.widthPercent != null
        ? Number(styleCfg.bar.widthPercent)
        : null;
    series.columns.template.setAll({
      ...(widthPct != null ? { width: am5.percent(widthPct) } : {}),
      ...(color ? { fill: color, stroke: color } : {}),
    });
    const aggregatedOn = !!styleCfg.tooltip?.aggregated?.enabled;
    series.set(
      "tooltip",
      aggregatedOn
        ? am5.Tooltip.new(root, { forceHidden: true })
        : am5.Tooltip.new(root, {
            labelText: "[bold]{name}[/]\n{categoryX}: {valueY}",
          })
    );
    return series;
  }
  _createLineSeries(
    chart,
    root,
    key,
    styleCfg,
    fields,
    xAxis,
    yAxis,
    isShadow = false,
    color
  ) {
    const label = (styleCfg.seriesLabels && styleCfg.seriesLabels[key]) || key;
    const seriesStrokeCfg = styleCfg.seriesStyles?.[key]?.strokeWidth;
    const globalStrokeCfg = styleCfg.line?.strokeWidth;
    const strokeWidth = Number(
      seriesStrokeCfg !== undefined
        ? seriesStrokeCfg
        : globalStrokeCfg !== undefined
        ? globalStrokeCfg
        : isShadow
        ? 2
        : 4
    );
    const series = chart.series.push(
      am5xy.SmoothedXLineSeries.new(root, {
        name: label,
        xAxis,
        yAxis,
        valueYField: key,
        categoryXField: fields.category,
      })
    );
    const paint = color
      ? typeof color === "string"
        ? am5.color(color)
        : color
      : null;
    if (paint) {
      series.setAll({ stroke: paint, fill: paint });
    }
    series.set("curveFactory", am5.curveCatmullRom);
    series.strokes.template.setAll({
      ...(paint ? { stroke: paint } : {}),
      strokeWidth,
      strokeLinecap: "round",
    });
    const aggregatedOn = !!styleCfg.tooltip?.aggregated?.enabled;
    series.set(
      "tooltip",
      aggregatedOn
        ? am5.Tooltip.new(root, { forceHidden: true })
        : am5.Tooltip.new(root, {
            labelText: "[bold]{name}[/]\n{categoryX}: {valueY}",
          })
    );
    if (isShadow) {
      const fillColor = paint || series.get("stroke") || am5.color(0x000000);
      series.fills.template.set(
        "fillGradient",
        am5.LinearGradient.new(root, {
          stops: [
            { color: fillColor, opacity: 0.3 },
            { color: fillColor, opacity: 0.2 },
            { color: am5.color(0xffffff), opacity: 0.0 },
          ],
          rotation: 90,
        })
      );
      series.fills.template.setAll({ visible: true, fillOpacity: 1 });
    }
    return series;
  }
  async renderSingleChart(containerEl) {
    const host =
      containerEl.querySelector(this._opts.selectors.chartHost) || containerEl;
    const styleCfg =
      this._parseJSONAttr(containerEl, "data-chart-config") || {};
    const baseCfg = this._configs.base?.[styleCfg.configKey];
    if (!baseCfg) {
      console.error(
        "[ChartsHandler] base config missing for",
        styleCfg.configKey
      );
      return;
    }
    const dataset = this._configs.data?.[baseCfg.datasetKey];
    if (!dataset) {
      console.error("[ChartsHandler] dataset missing for", baseCfg.datasetKey);
      return;
    }
    const type = styleCfg.type || baseCfg.defaultType || "bar";
    const period = styleCfg.period || baseCfg.defaultPeriod || "yearly";
    const fields = baseCfg.fields || { category: "date", total: "total" };
    const breakdownKeys = baseCfg.breakdownKeys || [];
    const rows = (dataset[period] || []).slice();
    const chartId =
      containerEl.getAttribute("data-chart-id") ||
      styleCfg.configKey + "-" + period;
    await this._createChart(chartId, host, {
      styleCfg,
      type,
      fields,
      breakdownKeys,
      rows,
    });
  }
  async _switchEarningsChart(nextType) {
    const idMap = { bar: "earnings-bar", line: "earnings-line" };
    const nextId = idMap[nextType] || "earnings-bar";
    if (!this._currentEarningsId) this._currentEarningsId = null;
    if (this._currentEarningsId && this._currentEarningsId !== nextId) {
      this._disposeChart(this._currentEarningsId);
      const prevEl = document.querySelector(
        `.chart-container[data-chart-id="${this._currentEarningsId}"]`
      );
      if (prevEl) {
        const host = prevEl.querySelector(
          this._opts?.selectors?.chartHost || ".amchart"
        );
        if (host) host.innerHTML = "";
        const legend = prevEl.querySelector("[data-legend]");
        if (legend) legend.remove();
      }
    }
    const nextEl = document.querySelector(
      `.chart-container[data-chart-id="${nextId}"]`
    );
    if (!nextEl) return;
    this._disposeChart(nextId);
    const host = nextEl.querySelector(
      this._opts?.selectors?.chartHost || ".amchart"
    );
    if (host) host.innerHTML = "";
    await this.renderSingleChart(nextEl);
    this._currentEarningsId = nextId;
  }
async _renderScopeSelection(key, scopeEl) {
  if (!key) return;
  const parts = String(key).split(".");
  if (parts.length !== 3) return;
  const [section, period, view] = parts;
  const scope =
    scopeEl || document.querySelector(`[data-scope="${section}"]`);
  if (!scope) return;
  const ACTIVE_CLASS = "is-scope-target";
  const all = scope.querySelectorAll(
    `.chart-container[data-chart-id^="${section}-"]`
  );
  all.forEach((el) => {
    const id = el.getAttribute("data-chart-id") || "";
    if (id) this._disposeChart(id);
    const host = el.querySelector(
      this._opts?.selectors?.chartHost || ".amchart"
    );
    if (host) host.innerHTML = "";
    el.setAttribute("hidden", "");
    el.classList.remove(ACTIVE_CLASS);
  });
  const target =
    scope.querySelector(
      `.chart-container[data-chart-id="${section}-${period}-${view}"]`
    ) ||
    scope.querySelector(
      `.chart-container[data-chart-id="${section}-${view}"]`
    );
  if (!target) return;
  const cfg = this._parseJSONAttr(target, "data-chart-config") || {};
  cfg.period = period;
  cfg.type = view;
  target.setAttribute("data-chart-config", JSON.stringify(cfg));
  target.removeAttribute("hidden");
  target.classList.add(ACTIVE_CLASS);
  await this.renderSingleChart(target);
}
  async _initEarningsSwitcher() {
    const viewSel = document.getElementById("earningsViewSelect");
    const initial = viewSel ? String(viewSel.value || "bar") : "bar";
    await this._switchEarningsChart(initial);
  }
  updateToggleButton() {
    const nextType = this.charts[(this.currentIndex + 1) % this.charts.length];
    const toggleBtn = document.getElementById("toggleBtn");
    if (toggleBtn)
      toggleBtn.textContent = `Switch to ${
        nextType === "bar" ? "Line Chart" : "Bar Chart"
      }`;
  }
_normalizePeriodForId(period) {
  const p = String(period || "").toLowerCase().trim();
  return p === "daily" ? "day"
       : p === "weekly" ? "week"
       : p === "monthly" ? "month"
       : p === "yearly" ? "year"
       : p; // already normalized (day|week|month|year)
}
_buildTargetId(section, period, view) {
  const slot = this._normalizePeriodForId(period);
  return `${section}-${slot}-${view}`; // e.g., earnings-month-bar
}
_getChartHost(el) {
  return el?.querySelector(this._opts?.selectors?.chartHost || ".amchart");
}
setupEventListeners() {
  const scopes = document.querySelectorAll("[data-scope]");
  scopes.forEach((scopeEl) => {
    const section = scopeEl.getAttribute("data-scope");
    if (!section) return;
    const periodSel = scopeEl.querySelector('select[data-role="period"]');
    const viewSel   = scopeEl.querySelector('select[data-role="view"]');
    if (!periodSel || !viewSel) return;
    const onChange = () => {
      const period = String(periodSel.value || "").trim();
      const view   = String(viewSel.value   || "").trim();
      if (!period || !view) return;
      const key = `${section}.${period}.${view}`;
      console.groupCollapsed(`[ChartManager] Selection Change → ${key}`);
      console.log("Section:", section);
      console.log("Period:", period);
      console.log("View:", view);
      console.groupEnd();
      this._renderScopeSelection(key, scopeEl).catch((err) =>
        console.error("[ChartManager] renderScopeSelection error:", err)
      );
    };
    periodSel.addEventListener("change", onChange);
    viewSel.addEventListener("change", onChange);
  });
}
_getSectionRoot(section, scopeEl) {
  const chartsScope = document.querySelector(`[data-charts-scope="${section}"]`);
  if (chartsScope) return chartsScope;
  const fromScope = scopeEl?.closest?.(`[data-charts-scope="${section}"]`);
  if (fromScope) return fromScope;
  if (scopeEl) return scopeEl;
  return document;
}
async _renderScopeSelection(key, scopeEl) {
  if (!key) return;
  const [section, period, view] = String(key).split(".");
  const root = this._getSectionRoot(section, scopeEl);
  const ACTIVE_CLASS = "is-scope-target";
  console.groupCollapsed(`[ChartManager] RenderScopeSelection: ${key}`);
  console.log("Section:", section);
  console.log("Resolved section root:", root);
  const all = root.querySelectorAll(`.chart-container[data-chart-id^="${section}-"]`);
  const ids = Array.from(all).map(el => el.getAttribute("data-chart-id"));
  console.log("Charts in resolved section root:", ids.length, ids);
  all.forEach((el) => {
    el.setAttribute("hidden", "");
    el.classList.remove(ACTIVE_CLASS);
  });
  all.forEach((el) => {
    const id = el.getAttribute("data-chart-id") || "";
    if (id) {
      this._disposeChart(id);
      console.log("Disposed:", id);
    }
    const host = el.querySelector(this._opts?.selectors?.chartHost || ".amchart");
    if (host) {
      host.innerHTML = "";
      console.log("Cleared host for:", id);
    }
  });
  const norm = (p) =>
    p === "daily" ? "day" : p === "weekly" ? "week" : p === "monthly" ? "month" : p === "yearly" ? "year" : p;
  const targetId = `${section}-${norm(period)}-${view}`;
  let targetEl = root.querySelector(`.chart-container[data-chart-id="${targetId}"]`);
  if (!targetEl) {
    targetEl = root.querySelector(`.chart-container[data-chart-id="${section}-${view}"]`);
    if (targetEl) console.warn("[ChartManager] fallback target matched:", targetEl.getAttribute("data-chart-id"));
  }
  if (!targetEl) {
    console.error("[ChartManager] No target container found for:", key, "Tried:", targetId);
    console.groupEnd();
    return;
  }
  console.log("Target container resolved:", targetId);
  const cfg = this._parseJSONAttr(targetEl, "data-chart-config") || {};
  cfg.period = period; // keep daily|weekly|monthly|yearly for data lookup
  cfg.type   = view;   // bar|line
  targetEl.setAttribute("data-chart-config", JSON.stringify(cfg));
  console.log("Updated target config:", cfg);
  targetEl.removeAttribute("hidden");
  targetEl.classList.add(ACTIVE_CLASS);
  console.log("Unhidden + marked active:", targetId);
  await this.renderSingleChart(targetEl);
  console.log("Render complete for:", targetId);
  console.groupEnd();
}
  async initializeFromDOM() {
    return this.initChartManager();
  }
  _parseJSONAttr(el, attr) {
    const raw = el.getAttribute(attr);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch (e) {
      console.error(`[ChartsHandler] Invalid JSON in ${attr}. Raw:`, raw, e);
      return null;
    }
  }
  async _fetchJSON(url) {
    const r = await fetch(url, { cache: "no-store" });
    if (!r.ok) throw new Error("Fetch failed " + url);
    return r.json();
  }
  _toHexColor(input) {
    try {
      if (!input) return "#999";
      if (typeof input.toCSSHex === "function") return input.toCSSHex();
      const c =
        am5.Color && am5.Color.fromAny
          ? am5.Color.fromAny(input)
          : am5.color(input);
      if (c?.toCSSHex) return c.toCSSHex();
      return String(input);
    } catch {
      return "#999";
    }
  }
  async render(containerEl) {
    return this.renderSingleChart(containerEl);
  }
async renderDefaultChart(section) {
  console.groupCollapsed(`[ChartManager] renderDefaultChart("${section}")`);
  if (!section) {
    console.error("[ChartManager] renderDefaultChart: missing section name");
    console.groupEnd();
    return;
  }
  const root = this._getSectionRoot(section /*, optional scopeEl */);
  if (!root) {
    console.error("[ChartManager] renderDefaultChart: no root for section:", section);
    console.groupEnd();
    return;
  }
  console.log("Resolved section root:", root);
  const ACTIVE_CLASS = "is-scope-target";
  const all = root.querySelectorAll(`.chart-container[data-chart-id^="${section}-"]`);
  const allIds = Array.from(all).map(el => el.getAttribute("data-chart-id"));
  console.log("Charts in section:", allIds);
  all.forEach((el) => {
    el.setAttribute("hidden", "");
    el.classList.remove(ACTIVE_CLASS);
  });
  all.forEach((el) => {
    const id = el.getAttribute("data-chart-id") || "";
    if (id) {
      this._disposeChart(id);
      console.log("Disposed:", id);
    }
    const host = el.querySelector(this._opts?.selectors?.chartHost || ".amchart");
    if (host) {
      host.innerHTML = "";
      console.log("Cleared host for:", id);
    }
  });
  const defaults = root.querySelectorAll('.chart-container[data-chart-default]');
  if (!defaults.length) {
    console.warn(`[ChartManager] renderDefaultChart: no [data-chart-default] in section "${section}"`);
    console.groupEnd();
    return;
  }
  if (defaults.length > 1) {
    console.warn(`[ChartManager] renderDefaultChart: multiple defaults found in "${section}". Using the first.`);
  }
  const targetEl = defaults[0];
  const targetId = targetEl.getAttribute("data-chart-id");
  console.log("Default target:", targetId);
  targetEl.removeAttribute("hidden");
  targetEl.classList.add(ACTIVE_CLASS);
  await this.renderSingleChart(targetEl);
  console.log("Render complete for default:", targetId);
  console.groupEnd();
}
_initEventBridge() {
  if (this._bridgeAttached) return;               // idempotent
  this._bridgeAttached = true;
  console.log("[ChartsHandler] bridge attached");
  window.__chartsBridgeReady = true;              // global readiness flag
  window.dispatchEvent(new Event("charts:ready"));// tell the app the bridge is live
  window.addEventListener("charts:render-default", async (e) => {
    const section = e?.detail?.section;
    console.groupCollapsed("[ChartsHandler] EVT charts:render-default", e?.detail);
    if (!section) { console.warn("missing detail.section"); console.groupEnd(); return; }
    try {
      await this.renderDefaultChart(section);
      console.log("default rendered for:", section);
    } catch (err) {
      console.error("renderDefaultChart error:", err);
    }
    console.groupEnd();
  });
}
  async _createChart(chartId, hostEl, ctx) {
    const { styleCfg, type, fields, breakdownKeys, rows } = ctx;
    this._disposeChart(chartId);
    const root = am5.Root.new(hostEl);
    this._rootById.set(chartId, root);
    if (styleCfg.hideLogo !== false) root._logo?.dispose?.();
    root.setThemes([am5themes_Animated.new(root)]);
    if (type === "map") {
      const chart = root.container.children.push(
        am5map.MapChart.new(root, {
          homeZoomLevel: 1,
          homeGeoPoint: { longitude: 0, latitude: 40 },
        })
      );
      const worldSeries = chart.series.push(
        am5map.MapPolygonSeries.new(root, {
          geoJSON: am5geodata_worldLow,
          exclude: ["AQ"],
        })
      );
      worldSeries.mapPolygons.template.setAll({ fill: am5.color(0xaaaaaa) });
      worldSeries.events.on("datavalidated", () => {
        chart.goHome();
      });
      const ttColorHex = styleCfg.tooltip?.color || "#344054";
      const valPrefix = styleCfg.tooltip?.valuePrefix ?? "";
      const valSuffix = styleCfg.tooltip?.valueSuffix ?? "";
      const tt = am5.Tooltip.new(root, {});
      tt.set("getFillFromSprite", false);
      tt.get("background").setAll({
        fill: am5.color(0xffffff),
        stroke: am5.color(0xe2e2e2),
        strokeWidth: 1,
        cornerRadiusTL: 4,
        cornerRadiusTR: 4,
        cornerRadiusBL: 4,
        cornerRadiusBR: 4,
      });
      tt.label.setAll({
        textType: "bbcode",
        autoTextColor: false,
        fill: am5.color(ttColorHex),
      });
      tt.label.adapters.add("fill", () => am5.color(ttColorHex));
      am5.array.each(rows, (group) => {
        if (!styleCfg.groupColors || !styleCfg.groupColors[group.name]) {
          throw new Error(`[map] Missing groupColors for "${group.name}"`);
        }
        const countries = group.data.map((c) => c.id);
        const polygonSeries = chart.series.push(
          am5map.MapPolygonSeries.new(root, {
            geoJSON: am5geodata_worldLow,
            include: countries,
            name: group.name,
          })
        );
        polygonSeries.set("tooltip", tt);
        polygonSeries.mapPolygons.template.setAll({
          tooltipText:
            "[font color='" +
            ttColorHex +
            "'][bold]{name}[/][/]\n" +
            "[font color='" +
            ttColorHex +
            "']" +
            valPrefix +
            "{sales}" +
            valSuffix +
            "[/]",
          interactive: true,
          fill: am5.color(styleCfg.groupColors[group.name]),
          strokeWidth: 2,
          cursorOverStyle: "pointer",
        });
        polygonSeries.mapPolygons.template.events.on("click", (ev) => {
          const di = ev?.target?.dataItem;
          if (di) polygonSeries.zoomToDataItem(di);
        });
        chart.seriesContainer.events.on("dblclick", () => {
          chart.goHome();
        });
        polygonSeries.data.setAll(group.data);
      });

      if (styleCfg?.legentHint?.enabled) {
        const items = rows.map((g) => ({
          name: g.name,
          color: styleCfg.groupColors[g.name],
        }));
        this._renderLegend(chartId, hostEl, items, styleCfg.legentHint);
      }
      return;
    }
    if (type === "donut") {
      const chart = root.container.children.push(
        am5percent.PieChart.new(root, {
          layout: root.verticalLayout,
          innerRadius: am5.percent(70),
        })
      );
      const series = chart.series.push(
        am5percent.PieSeries.new(root, {
          name: "Series",
          categoryField: fields.category,
          valueField: fields.total,
          alignLabels: false,
          legendValueText: "",
        })
      );
      const ttColorHex = styleCfg.tooltip?.color || "#344054";
      const tt = am5.Tooltip.new(root, {});
      tt.set("getFillFromSprite", false);
      tt.get("background").setAll({
        fill: am5.color(0xffffff),
        stroke: am5.color(0xe2e2e2),
        strokeWidth: 1,
        cornerRadiusTL: 4,
        cornerRadiusTR: 4,
        cornerRadiusBL: 4,
        cornerRadiusBR: 4,
      });
      tt.label.setAll({
        textType: "bbcode",
        autoTextColor: false,
        fill: am5.color(ttColorHex),
      });
      tt.label.adapters.add("fill", () => am5.color(ttColorHex));
      series.set("tooltip", tt);
      series.slices.template.adapters.add("fill", (fill, target) => {
        const di = target?.dataItem;
        if (!di) return fill;
        const label = di.get("category") || di.dataContext?.[fields.category];
        const key =
          styleCfg.categoryKeyMap?.[label] ||
          String(label || "")
            .toLowerCase()
            .replace(/\s+/g, "");
        const hex = styleCfg.seriesStyles?.[key]?.color;
        if (!hex)
          throw new Error(
            `[donut] Missing seriesStyles color for key "${key}" (from label "${label}")`
          );
        return am5.color(hex);
      });
      series.slices.template.adapters.add("stroke", (stroke, target) => {
        const di = target?.dataItem;
        if (!di) return stroke;
        const label = di.get("category") || di.dataContext?.[fields.category];
        const key =
          styleCfg.categoryKeyMap?.[label] ||
          String(label || "")
            .toLowerCase()
            .replace(/\s+/g, "");
        const hex = styleCfg.seriesStyles?.[key]?.color;
        if (!hex)
          throw new Error(
            `[donut] Missing seriesStyles color for key "${key}" (from label "${label}")`
          );
        return am5.color(hex);
      });
      series.labels.template.set("forceHidden", true);
      series.ticks.template.set("forceHidden", true);
      series.data.setAll(rows);
      series.appear(1000, 100);
      if (styleCfg?.legentHint?.enabled) {
        const items = rows.map((r) => {
          const key =
            styleCfg.categoryKeyMap?.[r[fields.category]] ||
            String(r[fields.category] || "")
              .toLowerCase()
              .replace(/\s+/g, "");
          return {
            name: r[fields.category],
            color: styleCfg.seriesStyles?.[key]?.color,
          };
        });
        this._renderLegend(chartId, hostEl, items, styleCfg.legentHint);
      }
      return;
    }
    if (type === "column-with-icons") {
      const chart = root.container.children.push(
        am5xy.XYChart.new(root, {
          panX: false,
          panY: false,
          wheelX: "none",
          wheelY: "none",
          paddingLeft: 0,
          paddingBottom: 60,
          layout: root.verticalLayout,
        })
      );
      if (!styleCfg.color) throw new Error("[visits] Missing color map");
      const dataWithColors = rows.map((item) => {
        const key = (item?.country ? String(item.country) : "").toLowerCase();
        const hex = styleCfg.color[key];
        if (!hex) throw new Error(`[visits] Missing color for "${key}"`);
        return {
          ...item,
          fill: hex,
          stroke: hex,
          columnSettings: { fill: hex },
        };
      });
      const xRenderer = am5xy.AxisRendererX.new(root, {
        minGridDistance: 30,
        minorGridEnabled: true,
      });
      const xAxis = chart.xAxes.push(
        am5xy.CategoryAxis.new(root, {
          categoryField: fields.category,
          renderer: xRenderer,
          bullet: function (root, axis, dataItem) {
            const chartWidth = root.container.width();
            const iconSize = Math.max(20, Math.min(40, chartWidth / 40));
            return am5xy.AxisBullet.new(root, {
              location: 0.5,
              sprite: am5.Picture.new(root, {
                width: iconSize,
                height: iconSize,
                centerY: am5.p50,
                centerX: am5.p50,
                y: 30,
                src: dataItem.dataContext.icon,
              }),
            });
          },
        })
      );
      xRenderer.grid.template.setAll({ location: 1, visible: false });
      xRenderer.minorGrid?.template.setAll({ visible: false });
      xRenderer.labels.template.setAll({ paddingTop: 50, forceHidden: true });
      const valueField = fields.total || "total";
      const filteredData = dataWithColors.filter(
        (d) => Number(d[valueField] || 0) !== 0
      );
      xAxis.data.setAll(filteredData);
      const yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          renderer: am5xy.AxisRendererY.new(root, { strokeOpacity: 0.1 }),
        })
      );
      yAxis.get("renderer").grid.template.setAll({ visible: false });
      yAxis.get("renderer").setAll({ strokeOpacity: 0 });
      const series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          xAxis,
          yAxis,
          valueYField: fields.total,
          categoryXField: fields.category,
        })
      );
      if (styleCfg.bar?.widthPercent != null) {
        series.columns.template.setAll({
          strokeOpacity: 0,
          width: am5.percent(styleCfg.bar.widthPercent),
        });
      }
      series.columns.template.adapters.add("fill", (fill, target) => {
        const di = target?.dataItem;
        const dc = di?.dataContext || {};
        return dc.fill ? am5.color(dc.fill) : fill;
      });
      series.columns.template.adapters.add("stroke", (stroke, target) => {
        const di = target?.dataItem;
        const dc = di?.dataContext || {};
        return dc.stroke ? am5.color(dc.stroke) : stroke;
      });
      series.data.setAll(filteredData);
      const tooltip = this._createCodePenTooltip(root);
      tooltip.label.setAll({ forceHidden: true });
      const tooltipContent = am5.Container.new(root, {
        layout: root.horizontalLayout,
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 0,
        centerY: am5.p50,
      });
      const tooltipImage = am5.Picture.new(root, {
        width: 28,
        height: 28,
        centerY: am5.p50,
        marginRight: 10,
        visible: true,
      });
      const tooltipText = am5.Label.new(root, {
        textType: "bbcode",
        fontFamily: "Poppins, sans-serif",
        fontSize: "0.75rem",
        fill: am5.color(0x344054),
        textAlign: "left",
        centerY: am5.p50,
      });
      tooltipContent.children.pushAll([tooltipImage, tooltipText]);
      tooltip.children.push(tooltipContent);
      tooltip.label.adapters.add("text", (_t, _l) => {
        const dataItem = series.get("tooltipDataItem");
        if (!dataItem) return "";
        const ctx = dataItem.dataContext || {};
        const country = dataItem.get("categoryX") || "";
        const visits = dataItem.get("valueY") || 0;
        const col = ctx.fill || series.columns.template.get("fill");
        const hex = this._toHexColor(col);
        if (ctx.icon) {
          tooltipImage.setAll({ src: ctx.icon, visible: true });
        } else {
          tooltipImage.setAll({ visible: false });
        }
        tooltipText.set(
          "text",
          `[font color='#667085'][bold]${country}[/]\n[${hex} width:12px height:12px]●[/] [fontWeight:normal width:120px]Visits:[/] [bold width:0px] ${visits}[/]`
        );
        return "";
      });
      chart.plotContainer.set("tooltipPosition", "pointer");
      chart.plotContainer.set("tooltipText", "a");
      chart.plotContainer.set("tooltip", tooltip);
      this._setupChartCursor(chart, root);
      series.appear();
      chart.appear(1000, 100);
      if (styleCfg?.legentHint?.enabled) {
        const items = filteredData.map((d) => ({
          name: d[fields.category],
          color: this._toHexColor(d.fill),
        }));
        this._renderLegend(chartId, hostEl, items, styleCfg.legentHint);
      }
      return;
    }
    const chart = this._createXYChart(root, styleCfg);
    const { xAxis, yAxis } = this._createAxes(chart, root, fields, styleCfg);
    // lock Y range (existing logic)
    if (styleCfg.yAxis?.autoMax || styleCfg.yAxis?.autoMaxBuffer != null) {
      const keys = breakdownKeys.length ? breakdownKeys : [fields.total];
      let maxVal = 0,
        minVal = 0;
      if (styleCfg.stacked) {
        rows.forEach((r) => {
          const sum = keys.reduce((s, k) => s + Number(r[k] || 0), 0);
          maxVal = Math.max(maxVal, sum);
          minVal = Math.min(minVal, sum);
        });
      } else {
        rows.forEach((r) => {
          keys.forEach((k) => {
            const v = Number(r[k] || 0);
            maxVal = Math.max(maxVal, v);
            minVal = Math.min(minVal, v);
          });
        });
      }
      const buffer = styleCfg.yAxis?.autoMaxBuffer ?? 0.12;
      const calculatedMax = Math.ceil(maxVal * (1 + buffer));
      const calculatedMin = Math.floor(minVal * (1 + buffer));
      if (minVal < 0)
        yAxis.setAll({
          max: calculatedMax,
          min: calculatedMin,
          strictMinMax: true,
        });
      else yAxis.setAll({ max: calculatedMax, strictMinMax: true });
    }
    xAxis.data.setAll(rows);
    const order = breakdownKeys.length ? breakdownKeys : [fields.total];
    if (!styleCfg.seriesStyles)
      throw new Error("[xy] Missing HTML seriesStyles");
    const fixedByKey = {};
    order.forEach((key) => {
      const hex = styleCfg.seriesStyles?.[key]?.color;
      if (!hex) throw new Error(`[xy] Missing seriesStyles color for "${key}"`);
      fixedByKey[key] = am5.color(hex);
    });
    let seriesList = [];
    if (type === "bar") {
      seriesList = order.map((key) => {
        const s = this._createColumnSeries(
          chart,
          root,
          key,
          styleCfg,
          fields,
          xAxis,
          yAxis,
          fixedByKey[key]
        );
        s.data.setAll(rows);
        s.appear();
        return s;
      });
    } else {
      const isShadow = type === "line-shadow";
      seriesList = order.map((key) => {
        const s = this._createLineSeries(
          chart,
          root,
          key,
          styleCfg,
          fields,
          xAxis,
          yAxis,
          isShadow,
          fixedByKey[key]
        );
        s.data.setAll(rows);
        s.appear();
        return s;
      });
    }
    const agg = styleCfg.tooltip?.aggregated;
    if (agg?.enabled && agg.mode === "codepen" && seriesList.length) {
      const tooltip = am5.Tooltip.new(root, {
        background: am5.RoundedRectangle.new(root, {
          fill: am5.color(0xffffff),
          shadowColor: am5.color(0xe2e2e2),
          shadowBlur: 8,
          shadowOffsetX: 0,
          shadowOffsetY: 0,
        }),
      });
      tooltip.get("background").setAll({
        cornerRadiusTL: 2,
        cornerRadiusTR: 2,
        cornerRadiusBL: 2,
        cornerRadiusBR: 2,
      });
      tooltip.label.setAll({
        textType: "bbcode",
        fontFamily: agg.fontFamily || "Poppins, sans-serif",
        fontSize: "0.75rem",
        fill: am5.color(0x344054),
        textAlign: "left",
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 0,
      });
      chart.plotContainer.set("tooltipPosition", "pointer");
      chart.plotContainer.set("tooltipText", "a");
      chart.plotContainer.set("tooltip", tooltip);
      const monthMap = {
        Jan: "JANUARY",
        Feb: "FEBRUARY",
        Mar: "MARCH",
        Apr: "APRIL",
        May: "MAY",
        Jun: "JUNE",
        Jul: "JULY",
        Aug: "AUGUST",
        Sep: "SEPTEMBER",
        Oct: "OCTOBER",
        Nov: "NOVEMBER",
        Dec: "DECEMBER",
      };
      tooltip.label.adapters.add("text", (_t, _l) => {
        let total = 0,
          xLabel = "",
          year = "";
        const lines = [];
        seriesList.forEach((series, i) => {
          const di = series.get("tooltipDataItem");
          if (!di) return;
          const v = Number(di.get("valueY") || 0);
          total += v;
          if (i === 0) {
            xLabel = di.get("categoryX") || "";
            const ctx = di.dataContext || {};
            year = ctx.year != null ? String(ctx.year) : "";
          }
          const col =
            series.columns?.template?.get?.("fill") ||
            series.get("fill") ||
            series.get("stroke");
          const hex = this._toHexColor(col);
          lines.push(
            `[${hex} width:8px height:8px]●[/] [fontWeight:normal width:120px]${series.get(
              "name"
            )}:[/] [bold width:0px] ${agg.valuePrefix || ""}${v}${
              agg.valueSuffix || ""
            }[/]`
          );
        });
        const header = `[font color='#667085'][bold]${
          monthMap[xLabel] || xLabel
        }${year ? " " + year : ""}[/]`;
        const sep = `\n[font color='#D0D5DD']───────────────────────[/font]\n`;
        const tail = `[fontWeight:normal width:130px][font color='#667085']Total Earnings:[/font][/] [bold width:0px] ${
          agg.valuePrefix || ""
        }${total}${agg.valueSuffix || ""}[/]`;
        return `${header}\n\n${lines.join("\n\n")}${sep}${tail}`;
      });
      const cursor = chart.set(
        "cursor",
        am5xy.XYCursor.new(root, { behavior: "none" })
      );
      cursor.lineY.set("visible", false);
      cursor.lineX.set("visible", false);
    }
    if (styleCfg.legentHint?.enabled) {
      const items = (breakdownKeys.length ? breakdownKeys : [fields.total]).map(
        (k) => ({
          name: styleCfg.seriesLabels?.[k] || k,
          color: this._toHexColor(fixedByKey[k]),
        })
      );
      this._renderLegend(chartId, hostEl, items, styleCfg.legentHint);
    }
  }
  _getRowColor(dc) {
    if (!dc) return null;
    return dc.color || dc.fill || dc.hex || null;
  }
  _assertRowColors(rows, fields, chartId) {
    const missing = [];
    (rows || []).forEach((r, i) => {
      if (!this._getRowColor(r)) {
        const label = r?.[fields?.category] ?? `row#${i}`;
        missing.push(label);
      }
    });
    if (missing.length) {
      throw new Error(
        `[${chartId}] dataset is missing color for: ${missing.join(", ")}`
      );
    }
  }
  _renderLegend(chartId, hostEl, items = [], cfg = {}) {
    if (!hostEl || !Array.isArray(items) || items.length === 0) return null;
    const parent = hostEl.parentElement || hostEl;
    const old = parent.querySelector(`[data-legend-for="${chartId}"]`);
    if (old && old.remove) old.remove();
    const container = document.createElement("div");
    container.setAttribute("data-legend-for", chartId);
    container.className =
      cfg.class || "flex flex-wrap justify-center gap-2 mt-3";
    for (const it of items) {
      const name = it && it.name ? String(it.name) : "";
      const color = this._toHexColor(it && it.color ? it.color : "#999");
      const item = document.createElement("div");
      item.className =
        cfg.itemClass ||
        "inline-flex items-center gap-2 rounded-xl px-3 py-1 text-sm bg-white shadow-sm ring-1 ring-gray-200";
      const marker = document.createElement("span");
      marker.className = cfg.markerClass || "w-3 h-3 rounded-full";
      marker.style.backgroundColor = color;
      const label = document.createElement("span");
      label.className = cfg.labelClass || "text-gray-700";
      label.textContent = name;
      item.appendChild(marker);
      item.appendChild(label);
      container.appendChild(item);
    }
    parent.appendChild(container);
    return container;
  }
_initScopedSelects() {
  const scopes = document.querySelectorAll("[data-scope]");
  scopes.forEach(scopeEl => {
    const section = scopeEl.getAttribute("data-scope");
    if (!section) return;
    const periodSel =
      scopeEl.querySelector('select[data-role="period"]') ||
      scopeEl.querySelector(`#${section}PeriodSelect`);
    const viewSel =
      scopeEl.querySelector('select[data-role="view"]') ||
      scopeEl.querySelector(`#${section}TypeSelect`);
    if (!periodSel || !viewSel) return;
    const updateKey = () => {
      const period = String(periodSel.value || "").trim();
      const view   = String(viewSel.value   || "").trim();
      if (!period || !view) return;
      const key = `${section}.${period}.${view}`;
      alert(key); // 🔧 replace later with re-render logic
    };
    periodSel.addEventListener("change", updateKey);
    viewSel.addEventListener("change", updateKey);
  });
}
  _autoLegendFromChart(chart, type, rows, fields) {
    if (!chart) return [];
    if (type === "donut" || type === "pie") {
      const series = chart.series.getIndex(0);
      if (!series) return [];
      return series.dataItems.map((di, i) => {
        const name =
          (di.dataContext && di.dataContext[fields.category]) ||
          di.get("category") ||
          "";
        const col =
          series.get("colors")?.colors?.[i] || di.get("slice")?.get("fill");
        return { name, color: this._toHexColor(col) };
      });
    }
    if (type === "map") {
      return (rows || []).map((g, idx) => ({
        name: g.name,
        color: this._toHexColor(g.color),
      }));
    }
    if (type === "bar" || type.startsWith("line")) {
      return (chart.series.values || []).map((s) => {
        const col = s.get("stroke") || s.get("fill");
        return { name: s.get("name") || "", color: this._toHexColor(col) };
      });
    }
    if (type === "column-with-icons") {
      const series = chart?.series?.getIndex?.(0);
      if (!series) return [];
      const dataItems = Array.isArray(series.dataItems) ? series.dataItems : [];
      const itemsFromSeries = dataItems
        .map((di) => {
          const name =
            (di?.dataContext && di.dataContext[fields?.category]) ||
            di?.get?.("categoryX") ||
            "";
          const fill =
            di?.dataContext?.fill ||
            series?.columns?.template?.get?.("fill") ||
            series?.get?.("fill");
          return { name, color: this._toHexColor(fill) };
        })
        .filter((x) => x && x.name);
      if (itemsFromSeries.length) return itemsFromSeries;
      return (rows || [])
        .map((r) => ({
          name: r?.[fields?.category] ?? "",
          color: this._toHexColor(r?.fill || "#999"),
        }))
        .filter((x) => x.name);
    }
    return [];
  }
}
document.addEventListener("DOMContentLoaded", async () => {
  const handler = new ChartsHandler();
  await handler.initChartManager();
});



/*
window.dispatchEvent(new CustomEvent("charts:render-default", {
  detail: { section: "earnings" }
}));
*/