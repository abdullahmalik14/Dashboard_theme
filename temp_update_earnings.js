const fs = require('fs');
const path = 'C:/Users/234/Downloads/kerjaan/Dashboard_theme/src/components/ui/popup/EarningsTrendPopup.vue';
let content = fs.readFileSync(path, 'utf8');

// Replacements

content = content.replace(
  /<div class="flex flex-col justify-center items-center gap-6 h-full text-center">[\s\S]*?<img src="\/images\/noTrendImg\.png"[\s\S]*?earn<\/a>\s*<\/div>\s*<\/div>\s*<\/div>/,
  \<div class="flex justify-between items-center gap-2 absolute top-4 right-4 z-10">
            <div v-if="!isDaily" class="flex gap-1 bg-[#F9FAFB] p-1 rounded-lg border border-[#EAECF0]">
              <button class="p-1.5 rounded-md cursor-pointer transition-all" :class="salesView==='bar'?'bg-white shadow-sm':'bg-transparent'" @click="setSalesView('bar')">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" :stroke="salesView==='bar'?'#344054':'#98A2B3'" stroke-width="2" stroke-linecap="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
              </button>
              <button class="p-1.5 rounded-md cursor-pointer transition-all" :class="salesView==='line'?'bg-white shadow-sm':'bg-transparent'" @click="setSalesView('line')">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" :stroke="salesView==='line'?'#344054':'#98A2B3'" stroke-width="2" stroke-linecap="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
              </button>
            </div>
          </div>
          <div class="relative w-full h-full min-h-[250px] mt-4">
             <div data-chart-container data-chart-id="sales-daily-bar" :hidden="!isDaily||undefined" class="absolute inset-0" :data-chart-config='salesBarCfg("sales-daily")'><div amchart data-role="chart" style="width:100%;height:100%;"></div></div>
             <div data-chart-container data-chart-id="sales-weekly-bar" :hidden="isDaily||!(activePeriod==='weekly'&&salesView==='bar')||undefined" class="absolute inset-0" :data-chart-config='salesBarCfg("sales-weekly")'><div amchart data-role="chart" style="width:100%;height:100%;"></div></div>
             <div data-chart-container data-chart-id="sales-weekly-line" :hidden="isDaily||!(activePeriod==='weekly'&&salesView==='line')||undefined" class="absolute inset-0" :data-chart-config='salesLineCfg("sales-weekly")'><div amchart data-role="chart" style="width:100%;height:100%;"></div></div>
             <div data-chart-container data-chart-id="sales-monthly-bar" :hidden="isDaily||!(activePeriod==='monthly'&&salesView==='bar')||undefined" class="absolute inset-0" :data-chart-config='salesBarCfg("sales-monthly")'><div amchart data-role="chart" style="width:100%;height:100%;"></div></div>
             <div data-chart-container data-chart-id="sales-monthly-line" :hidden="isDaily||!(activePeriod==='monthly'&&salesView==='line')||undefined" class="absolute inset-0" :data-chart-config='salesLineCfg("sales-monthly")'><div amchart data-role="chart" style="width:100%;height:100%;"></div></div>
             <div data-chart-container data-chart-id="sales-yearly-bar" :hidden="isDaily||!(activePeriod==='yearly'&&salesView==='bar')||undefined" class="absolute inset-0" :data-chart-config='salesBarCfg("sales-yearly")'><div amchart data-role="chart" style="width:100%;height:100%;"></div></div>
             <div data-chart-container data-chart-id="sales-yearly-line" :hidden="isDaily||!(activePeriod==='yearly'&&salesView==='line')||undefined" class="absolute inset-0" :data-chart-config='salesLineCfg("sales-yearly")'><div amchart data-role="chart" style="width:100%;height:100%;"></div></div>
          </div>
        </div>\
);

content = content.replace(
  /<div class="flex flex-col justify-center items-center gap-6 h-full text-center">[\s\S]*?<img src="\/images\/noTrendImg\.png"[\s\S]*?earn<\/a>\s*<\/div>\s*<\/div>\s*<\/div>/,
  \<div class="flex justify-between items-center gap-2 absolute top-4 right-4 z-10">
            <div v-if="!isDaily" class="flex gap-1 bg-[#F9FAFB] p-1 rounded-lg border border-[#EAECF0]">
              <button class="p-1.5 rounded-md cursor-pointer transition-all" :class="tokensView==='bar'?'bg-white shadow-sm':'bg-transparent'" @click="setTokensView('bar')">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" :stroke="tokensView==='bar'?'#344054':'#98A2B3'" stroke-width="2" stroke-linecap="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
              </button>
              <button class="p-1.5 rounded-md cursor-pointer transition-all" :class="tokensView==='line'?'bg-white shadow-sm':'bg-transparent'" @click="setTokensView('line')">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" :stroke="tokensView==='line'?'#344054':'#98A2B3'" stroke-width="2" stroke-linecap="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
              </button>
            </div>
          </div>
          <div class="relative w-full h-full min-h-[250px] mt-4">
             <div data-chart-container data-chart-id="tokens-daily-bar" :hidden="!isDaily||undefined" class="absolute inset-0" :data-chart-config='tokensBarCfg("tokens-daily")'><div amchart data-role="chart" style="width:100%;height:100%;"></div></div>
             <div data-chart-container data-chart-id="tokens-weekly-bar" :hidden="isDaily||!(activePeriod==='weekly'&&tokensView==='bar')||undefined" class="absolute inset-0" :data-chart-config='tokensBarCfg("tokens-weekly")'><div amchart data-role="chart" style="width:100%;height:100%;"></div></div>
             <div data-chart-container data-chart-id="tokens-weekly-line" :hidden="isDaily||!(activePeriod==='weekly'&&tokensView==='line')||undefined" class="absolute inset-0" :data-chart-config='tokensLineCfg("tokens-weekly")'><div amchart data-role="chart" style="width:100%;height:100%;"></div></div>
             <div data-chart-container data-chart-id="tokens-monthly-bar" :hidden="isDaily||!(activePeriod==='monthly'&&tokensView==='bar')||undefined" class="absolute inset-0" :data-chart-config='tokensBarCfg("tokens-monthly")'><div amchart data-role="chart" style="width:100%;height:100%;"></div></div>
             <div data-chart-container data-chart-id="tokens-monthly-line" :hidden="isDaily||!(activePeriod==='monthly'&&tokensView==='line')||undefined" class="absolute inset-0" :data-chart-config='tokensLineCfg("tokens-monthly")'><div amchart data-role="chart" style="width:100%;height:100%;"></div></div>
             <div data-chart-container data-chart-id="tokens-yearly-bar" :hidden="isDaily||!(activePeriod==='yearly'&&tokensView==='bar')||undefined" class="absolute inset-0" :data-chart-config='tokensBarCfg("tokens-yearly")'><div amchart data-role="chart" style="width:100%;height:100%;"></div></div>
             <div data-chart-container data-chart-id="tokens-yearly-line" :hidden="isDaily||!(activePeriod==='yearly'&&tokensView==='line')||undefined" class="absolute inset-0" :data-chart-config='tokensLineCfg("tokens-yearly")'><div amchart data-role="chart" style="width:100%;height:100%;"></div></div>
          </div>
        </div>\
);

content = content.replace(
  /<div class="flex-1 min-w-0 flex flex-col items-center justify-center p-6 min-h-\[300px\]">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/,
  \<div class="flex-1 min-w-0 flex flex-col p-2 min-h-[300px] relative">
            <div data-chart-container data-chart-id="countries-donut" class="absolute inset-0 w-full h-full"
              :data-chart-config='countriesDonutCfg("countries-donut")'>
              <div amchart data-role="chart" style="width:100%;height:100%;"></div>
            </div>
          </div>
        </div>\
);

content = content.replace(
  /<div class="flex justify-between items-center gap-2">\s*<h3 class="text-light-text-darkgray dark:text-white text-lg font-semibold">Sales Insight<\/h3>\s*<\/div>/,
  \<div class="relative"><h3 class="text-light-text-darkgray dark:text-white text-lg font-semibold mb-2">Sales Insight</h3></div>\
);

content = content.replace(
  /<div class="flex justify-between items-center gap-2">\s*<h3 class="text-light-text-darkgray dark:text-white text-lg font-semibold">Tokens Trend<\/h3>\s*<\/div>/,
  \<div class="relative"><h3 class="text-light-text-darkgray dark:text-white text-lg font-semibold mb-2">Tokens Trend</h3></div>\
);


let scriptReplacement = \
import { ref, computed, watch, nextTick, onMounted } from 'vue'
import { useDashboardAnalytics } from '@/store/DashboardAnalytics'

const props = defineProps({
  modelValue: Boolean,
  period: String,
  insightData: Object
})

const emit = defineEmits(['update:modelValue', 'update:period'])

const store = useDashboardAnalytics()

const activePeriod = computed(() => {
  const p = (props.period || 'yearly').toLowerCase().trim()
  if (p === 'all-time' || p === 'alltime') return 'yearly'
  return p
})
const isDaily = computed(() => activePeriod.value === 'daily')

const salesView = ref('bar')
const tokensView = ref('bar')

const LEGEND = { enabled:true, class:"flex flex-wrap justify-center gap-2 mt-3", itemClass:"inline-flex items-center gap-2 rounded-xl px-3 py-1 text-sm bg-white shadow-sm ring-1 ring-gray-200", markerClass:"w-3 h-3 rounded-full", labelClass:"text-gray-700" }
const SALES_STYLES = { subscription:{color:"#4CC9F0",name:"Subscription"}, paytoview:{color:"#4361EE",name:"Pay to View"}, merch:{color:"#7209B7",name:"Merch"}, wishtender:{color:"#F72585",name:"Wishtender"}, customrequest:{color:"#3A0CA3",name:"Custom Request"} }
const TOKENS_STYLES = { tipTokens:{color:"#4CC9F0",name:"Tips"}, callTokens:{color:"#4361EE",name:"Calls"}, chatTokens:{color:"#7209B7",name:"Chats"}, liveStreamTokens:{color:"#F72585",name:"Live Stream"} }

function salesBarCfg(dk) { return JSON.stringify({ type:"bar", period:"slot", datasetKey:dk, fields:{category:"period",total:"total"}, breakdownKeys:["subscription","paytoview","merch","wishtender","customrequest"], stacked:true, seriesStyles:SALES_STYLES, bar:{widthPercent:25}, axisLabelColor:"#475467", axisLabelFontSize:"12px", tooltip:{aggregated:{enabled:true,mode:"codepen",valuePrefix:"$",valueSuffix:""}}, yAxis:{autoMax:true,autoMaxBuffer:0.12,strict:true}, legentHint:LEGEND }) }
function salesLineCfg(dk) { return JSON.stringify({ type:"line", period:"slot", datasetKey:dk, fields:{category:"period",total:"total"}, breakdownKeys:["subscription","paytoview","merch","wishtender","customrequest"], stacked:true, seriesStyles:SALES_STYLES, axisLabelColor:"#475467", axisLabelFontSize:"12px", tooltip:{aggregated:{enabled:true,mode:"codepen",valuePrefix:"$",valueSuffix:""}}, yAxis:{autoMax:true,autoMaxBuffer:0.12,strict:true}, line:{strokeWidth:4}, legentHint:LEGEND }) }

function tokensBarCfg(dk) { return JSON.stringify({ type:"bar", period:"slot", datasetKey:dk, fields:{category:"period",total:"totalTokens"}, breakdownKeys:["tipTokens","callTokens","chatTokens","liveStreamTokens"], stacked:true, seriesStyles:TOKENS_STYLES, bar:{widthPercent:25}, axisLabelColor:"#475467", axisLabelFontSize:"12px", tooltip:{aggregated:{enabled:true,mode:"codepen",valuePrefix:"",valueSuffix:" tokens"}}, yAxis:{autoMax:true,autoMaxBuffer:0.12,strict:true}, legentHint:LEGEND }) }
function tokensLineCfg(dk) { return JSON.stringify({ type:"line", period:"slot", datasetKey:dk, fields:{category:"period",total:"totalTokens"}, breakdownKeys:["tipTokens","callTokens","chatTokens","liveStreamTokens"], stacked:true, seriesStyles:TOKENS_STYLES, axisLabelColor:"#475467", axisLabelFontSize:"12px", tooltip:{aggregated:{enabled:true,mode:"codepen",valuePrefix:"",valueSuffix:" tokens"}}, yAxis:{autoMax:true,autoMaxBuffer:0.12,strict:true}, line:{strokeWidth:4}, legentHint:LEGEND }) }

function countriesDonutCfg(dk) { return JSON.stringify({ type:"donut", period:"slot", datasetKey:dk, fields:{category:"country",total:"sales"}, categoryKeyMap:{}, seriesStyles:{}, legentHint:LEGEND }) }

function injectChartData() {
  if (!window.chartsHandler) return
  const b = store.earnings || {}
  
  window.chartsHandler._configs.data['sales-daily']  = { slot: b.daily ? [b.daily[b.daily.length-1]] : [] }
  window.chartsHandler._configs.data['sales-weekly'] = { slot: b.daily ? b.daily.slice(-7) : [] }
  window.chartsHandler._configs.data['sales-monthly'] = { slot: b.weekly || [] }
  window.chartsHandler._configs.data['sales-yearly'] = { slot: b.monthly || [] }

  window.chartsHandler._configs.data['tokens-daily']  = { slot: b.daily ? [b.daily[b.daily.length-1]] : [] }
  window.chartsHandler._configs.data['tokens-weekly'] = { slot: b.daily ? b.daily.slice(-7) : [] }
  window.chartsHandler._configs.data['tokens-monthly'] = { slot: b.weekly || [] }
  window.chartsHandler._configs.data['tokens-yearly'] = { slot: b.monthly || [] }

  const tc = props.insightData?.topCountries || []
  window.chartsHandler._configs.data['countries-donut'] = { slot: tc }
}

async function ensureReady() {
  if (!window.chartsHandler) return
  const hasData = window.chartsHandler._configs?.data && Object.keys(window.chartsHandler._configs.data).length > 0
  if (!hasData) await window.chartsHandler.loadChartConfigsAndData()
  injectChartData()
}

async function renderChart(chartId) {
  if (!window.chartsHandler) return
  const container = document.querySelector(\[data-chart-id="\"]\)
  if (!container) return
  try { window.chartsHandler.destroyChartInstance(chartId) } catch(e) {}
  container.removeAttribute('hidden')
  const host = container.querySelector('[amchart]')
  if (host) host.innerHTML = ''
  await window.chartsHandler.renderChartInstance(container)
}

async function renderCurrentCharts() {
  await ensureReady()
  if (isDaily.value) {
    await renderChart('sales-daily-bar')
    await renderChart('tokens-daily-bar')
  } else {
    const p = activePeriod.value
    await renderChart(\sales-\-\\)
    await renderChart(\	okens-\-\\)
  }
  if (props.insightData?.topCountries?.length > 0) {
    await renderChart('countries-donut')
  }
}

async function setSalesView(v) { salesView.value = v; await nextTick(); if (!isDaily.value) await renderChart(\sales-\-\\) }
async function setTokensView(v) { tokensView.value = v; await nextTick(); if (!isDaily.value) await renderChart(\	okens-\-\\) }

async function onPeriodChange(val) {
  emit('update:period', val)
  await nextTick()
  await renderCurrentCharts()
}

watch(() => props.modelValue, async (isOpen) => { if (isOpen) { await nextTick(); await renderCurrentCharts() } })
onMounted(async () => { if (props.modelValue) { await nextTick(); await renderCurrentCharts() } })
\

content = content.replace(/defineProps\(\{[\s\S]*?defineEmits\(\['update:modelValue', 'update:period'\]\)/, scriptReplacement);
content = content.replace(/@update:period="\\('update:period', \\)"/, '@update:period="onPeriodChange"');

fs.writeFileSync(path, content);
console.log('EarningsTrendPopup updated');
