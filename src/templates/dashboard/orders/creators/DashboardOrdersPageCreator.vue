<template>
  <div class="flex flex-col mt-6 gap-6">
    <!-- overview/insight section -->
    <DashboardOrdersPageContentCreator>
      <div>
        <!-- section-header -->
        <div class="flex flex-col items-start justify-between sm:flex-row sm:items-center p-4">
          <!-- title -->
          <div class="flex items-center gap-2 flex-grow flex-shrink [flex-basis: auto] min-w-0 min-h-0">
            <span>
              <img src="https://i.ibb.co.com/1G8tw4x3/svgviewer-png-output.webp" alt="overview/insight"
                class="w-6 h-6" />
            </span>
            <h2
              class="m-0 font-medium text-xl font-sans leading-[1.875rem] text-light-text-quaternary dark:text-dark-text-quaternary">
              Overview/Insight
            </h2>
          </div>
          <!-- last-date -->
          <!-- <div class="flex items-center gap-4 w-full justify-between sm:justify-end sm:w-auto">
            <span class="text-sm font-sans leading-5 text-light-text-quaternary dark:text-dark-text-quaternary">Last
              updated at
              <span class="text-sm font-sans leading-5 text-light-text-quaternary dark:text-dark-text-quaternary">{{
                formatTime(lastUpdated) }}</span></span>
            <button @click="handleRefresh"
              class="group flex items-center justify-center gap-1 pl-[0.9375rem] pr-2 py-1 bg-light-bg-button dark:bg-dark-bg-button [clip-path:polygon(0_0,100%_0,105%_105%,16%_105%)] rounded-none hover:bg-light-primary dark:hover:bg-dark-primaryHover [outline: none] border-0">
              <span>
                <img src="https://i.ibb.co.com/tPv74nnJ/svgviewer-png-output-1.webp" alt="refresh"
                  class="w-[.875rem] h-[.875rem] group-hover:[filter:brightness(0)_invert(1)]" />
              </span>
              <span
                class="text-xs font-sans font-medium leading-[1.125rem] text-light-primary dark:text-dark-primary group-hover:text-white dark:group-hover:text-[#e8e6e3]">Refresh</span>
            </button>
          </div> -->
        </div>

        <!-- row -->
        <div class="grid grid-cols-1 gap-4 pt-0 pb-4 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 px-4">
          <!-- left-column -->
          <div class="flex flex-col gap-4">
            <!-- subscribers -->
            <DashboardOrderCard>
              <div class="flex flex-col flex-grow flex-shrink [flex-basis: auto] gap-4 min-w-0 min-h-0">
                <!-- hover-overlay -->
                <div
                  class="absolute hidden group-hover/container:flex items-start justify-end w-full h-full top-0 left-0 z-[10000]">
                  <button @click="openSubscribers"
                    class="group/button flex items-center justify-center gap-1 pl-[0.9375rem] pr-2 py-1 bg-light-bg-button dark:bg-dark-bg-button [clip-path:polygon(0_0,100%_0,105%_105%,16%_105%)] rounded-none border-none outline-none hover/container:bg-light-primary dark:hover/container:bg-dark-primaryHover">
                    <span
                      class="text-xs font-sans font-medium leading-[1.125rem] text-light-primary dark:text-dark-primary group-hover/button:text-white dark:group-hover/button:text-[#e8e6e3]">Trend</span>
                    <span>
                      <img src="https://i.ibb.co.com/7dh1cRfK/svgviewer-png-output-2.webp" alt="expand"
                        class="w-[.875rem] h-[.875rem] group-hover/button:[filter:brightness(0)_invert(1)]" />
                    </span>
                  </button>
                </div>

                <!-- title -->
                <div class="flex items-center gap-2">
                  <h3
                    class="m-0 font-sans font-medium text-base leading-6 text-light-text-secondary dark:text-dark-text-secondary">
                    Subscribers
                  </h3>
                </div>

                <!-- data-content (new) -->
                <div
                  class="flex flex-col flex-grow flex-shrink [flex-basis: auto] justify-center items-start gap-4 min-w-0 min-h-0">
                  <div class="flex items-center gap-6 w-full flex-grow flex-shrink [flex-basis: auto] min-w-0 min-h-0">
                    <div class="flex flex-col gap-2 w-full flex-grow flex-shrink [flex-basis: auto] min-w-0 min-h-0">
                      <div class="relative">
                        <span
                          class="text-xs font-sans font-medium leading-[1.125rem] text-light-text-tertiary dark:text-dark-text-tertiary">New</span>
                      </div>

                      <div class="flex justify-between">
                        <span>
                          <span
                            class="text-[2.25rem] font-sans font-semibold leading-[2.75rem] tracking-[-0.045rem] text-light-text-primary dark:text-dark-text-primary">{{
                              store.subscribers?.daily?.new ?? '--' }}</span>
                        </span>

                        <!-- right part only show when data are here -->
                        <div v-if="
                          store.subscribers?.daily?.newPercentage !== undefined &&
                          store.subscribers?.daily?.newPercentage !== null
                        " class="flex flex-col items-center gap-1">
                          <span class="flex gap-1">
                            <img src="https://i.ibb.co.com/93tZHrmQ/svgviewer-png-output-4.webp" alt="trend-up"
                              class="h-5 w-5" />
                            <span
                              class="text-light-text-trendGreen dark:text-light-text-trendGreen leading-5 text-sm font-medium">{{
                                store.subscribers?.daily?.newPercentage }}%</span>
                          </span>
                          <span
                            class="-ml-4 text-light-text-secondary dark:text-dark-text-secondary leading-[1.125rem] text-xs">vs
                            yesterday</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- data-content (recurring) -->
                <div
                  class="flex flex-col flex-grow flex-shrink [flex-basis: auto] justify-center items-start gap-4 min-w-0 min-h-0">
                  <div class="flex items-center gap-6 w-full flex-grow flex-shrink [flex-basis: auto] min-w-0 min-h-0">
                    <div class="flex flex-col gap-2 w-full flex-grow flex-shrink [flex-basis: auto] min-w-0 min-h-0">
                      <div class="relative">
                        <span
                          class="text-xs font-sans font-medium leading-[1.125rem] text-light-text-tertiary dark:text-dark-text-tertiary">RECURRING</span>
                      </div>

                      <div class="flex justify-between">
                        <span>
                          <span
                            class="text-[2.25rem] font-sans font-semibold leading-[2.75rem] tracking-[-0.045rem] text-light-text-primary dark:text-dark-text-primary">{{
                              store.subscribers?.daily?.recurring ?? '--' }}</span>
                        </span>
                        <!-- right part only show when data are here -->
                        <div v-if="
                          store.subscribers?.daily?.recurringPercentage !== undefined &&
                          store.subscribers?.daily?.recurringPercentage !== null
                        " class="flex flex-col items-center gap-1">
                          <span class="flex gap-1">
                            <img src="https://i.ibb.co.com/93tZHrmQ/svgviewer-png-output-4.webp" alt="trend-up"
                              class="h-5 w-5" />
                            <span
                              class="text-light-text-trendGreen dark:text-light-text-trendGreen leading-5 text-sm font-medium">{{
                                store.subscribers?.daily?.recurringPercentage }}%</span>
                          </span>
                          <span
                            class="-ml-4 text-light-text-secondary dark:text-dark-text-secondary leading-[1.125rem] text-xs">vs
                            yesterday</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </DashboardOrderCard>

            <!-- fans-->
            <DashboardOrderCard>
              <div class="flex flex-col flex-grow flex-shrink [flex-basis: auto] gap-4 min-w-0 min-h-0">
                <!-- hover-overlay -->
                <div
                  class="absolute hidden group-hover/container:flex items-start justify-end w-full h-full top-0 left-0 z-[10000]">
                  <button @click="openFans"
                    class="group/button flex items-center justify-center gap-1 pl-[0.9375rem] pr-2 py-1 bg-light-bg-button dark:bg-dark-bg-button [clip-path:polygon(0_0,100%_0,105%_105%,16%_105%)] rounded-none border-none outline-none hover/container:bg-light-primary dark:hover/container:bg-dark-primaryHover">
                    <span
                      class="text-xs font-sans font-medium leading-[1.125rem] text-light-primary dark:text-dark-primary group-hover/button:text-white dark:group-hover/button:text-[#e8e6e3]">Trend</span>
                    <span>
                      <img src="https://i.ibb.co.com/7dh1cRfK/svgviewer-png-output-2.webp" alt="expand"
                        class="w-[.875rem] h-[.875rem] group-hover/button:[filter:brightness(0)_invert(1)]" />
                    </span>
                  </button>
                </div>

                <!-- title -->
                <div class="flex items-center gap-2">
                  <h3
                    class="m-0 font-medium font-sans text-base leading-6 text-light-text-secondary dark:text-dark-text-secondary">
                    Fans
                  </h3>
                </div>

                <!-- data-content (new followers - profile visit) -->
                <div
                  class="flex flex-col flex-grow flex-shrink [flex-basis: auto] justify-center items-start gap-4 min-w-0 min-h-0">
                  <div class="flex items-center gap-6 w-full flex-grow flex-shrink [flex-basis: auto] min-w-0 min-h-0">
                    <div class="flex flex-col gap-2 w-full flex-shrink items-start">
                      <span
                        class="text-xs font-medium font-sans leading-[1.125rem] whitespace-nowrap text-light-text-tertiary dark:text-dark-text-tertiary">NEW
                        FOLLOWERS</span>

                      <div class="flex items-end justify-between w-full gap-1">
                        <span
                          class="text-[1.875rem] font-sans font-semibold leading-[2.375rem] text-light-text-primary dark:text-dark-text-primary">
                          {{ store.fans?.daily?.newFollowers ?? '--' }}</span>
                        <div v-if="
                          store.fans?.daily?.newFollowersPercentage !== undefined &&
                          store.fans?.daily?.newFollowersPercentage !== null
                        " class="flex flex-col items-center gap-1">
                          <span class="flex gap-1">
                            <img src="https://i.ibb.co.com/sdvYZGVp/svgviewer-png-output-5.webp" alt="trend-down"
                              class="h-5 w-5" />
                            <span
                              class="text-light-text-trendRed dark:text-light-text-trendRed leading-5 text-sm font-medium">{{
                                store.fans?.daily?.newFollowersPercentage }}%</span>
                          </span>
                          <span
                            class="-ml-4 text-light-text-secondary dark:text-dark-text-secondary leading-[1.125rem] text-xs">vs
                            yesterday</span>
                        </div>
                      </div>
                    </div>

                    <div class="flex flex-col gap-2 w-full flex-shrink items-start">
                      <span
                        class="text-xs font-medium font-sans leading-[1.125rem] whitespace-nowrap text-light-text-tertiary dark:text-dark-text-tertiary">PROFILE
                        VISIT</span>

                      <div class="flex items-end justify-between w-full gap-1">
                        <span
                          class="text-[1.875rem] font-semibold font-sans leading-[2.375rem] text-light-text-primary dark:text-dark-text-primary">
                          {{ store.fans?.daily?.profileVisit ?? '--' }}</span>
                        <div v-if="
                          store.fans?.daily?.profileVisitPercentage !== undefined &&
                          store.fans?.daily?.profileVisitPercentage !== null
                        " class="flex flex-col items-center gap-1">
                          <span class="flex gap-1">
                            <img src="https://i.ibb.co.com/sdvYZGVp/svgviewer-png-output-5.webp" alt="trend-down"
                              class="h-5 w-5" />
                            <span
                              class="text-light-text-trendRed dark:text-light-text-trendRed leading-5 text-sm font-medium">{{
                                store.fans?.daily?.profileVisitPercentage }}%</span>
                          </span>
                          <span
                            class="-ml-4 text-light-text-secondary dark:text-dark-text-secondary leading-[1.125rem] text-xs">vs
                            yesterday</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </DashboardOrderCard>
          </div>

          <!-- middle-column -->
          <div class="flex flex-col gap-4">
            <!-- earnings-->
            <DashboardOrderCard>
              <div class="flex flex-col flex-grow flex-shrink [flex-basis: auto] gap-4 min-w-0 min-h-0">
                <!-- hover-overlay -->
                <div
                  class="absolute hidden group-hover/container:flex items-start justify-end w-full h-full top-0 left-0 z-[10000]">
                  <button @click="openEarnings"
                    class="group/button flex items-center justify-center gap-1 pl-[0.9375rem] pr-2 py-1 bg-light-bg-button dark:bg-dark-bg-button [clip-path:polygon(0_0,100%_0,105%_105%,16%_105%)] rounded-none border-none outline-none hover/container:bg-light-primary dark:hover/container:bg-dark-primaryHover">
                    <span
                      class="text-xs font-medium leading-[1.125rem] font-sans text-light-primary dark:text-dark-primary group-hover/button:text-white dark:group-hover/button:text-[#e8e6e3]">Trend</span>
                    <span>
                      <img src="https://i.ibb.co.com/7dh1cRfK/svgviewer-png-output-2.webp" alt="expand"
                        class="w-[.875rem] h-[.875rem] group-hover/button:[filter:brightness(0)_invert(1)]" />
                    </span>
                  </button>
                </div>

                <!-- title -->
                <div class="flex items-center gap-2">
                  <h3
                    class="m-0 font-medium text-base leading-6 font-sans text-light-text-secondary dark:text-dark-text-secondary">
                    Earnings
                  </h3>
                </div>

                <div class="flex justify-between">
                  <span>
                    <span
                      class="text-[2.25rem] font-semibold leading-[2.75rem] font-sans tracking-[-0.045rem] text-light-text-primary dark:text-dark-text-primary">{{
                        store.earnings?.daily?.[0]?.total ?? '--' }}</span>
                  </span>
                  <div v-if="
                    store.earnings?.daily?.[0]?.earningsPercentage !== undefined &&
                    store.earnings?.daily?.[0]?.earningsPercentage !== null
                  " class="flex flex-col items-center gap-1">
                    <span class="flex gap-1">
                      <img src="https://i.ibb.co.com/93tZHrmQ/svgviewer-png-output-4.webp" alt="trend-up"
                        class="h-5 w-5" />
                      <span
                        class="text-light-text-trendGreen dark:text-light-text-trendGreen leading-5 text-sm font-medium">{{
                          store.earnings?.daily?.[0]?.earningsPercentage }}%</span>
                    </span>
                    <span
                      class="-ml-4 text-light-text-secondary dark:text-dark-text-secondary leading-[1.125rem] text-xs">vs
                      yesterday</span>
                  </div>
                </div>
              </div>
            </DashboardOrderCard>

            <!-- likes -->
            <DashboardOrderCard
              class="group relative flex flex-col flex-grow flex-shrink [flex-basis: auto] gap-4 p-4 rounded-sm min-w-0 min-h-0 [backdrop-filter:blur(25px)] bg-light-bg-container dark:bg-dark-bg-container">
              <div class="flex flex-col flex-grow flex-shrink [flex-basis: auto] gap-4 min-w-0 min-h-0">
                <!-- hover-overlay -->
                <div
                  class="absolute hidden group-hover/container:flex items-start justify-end w-full h-full top-0 left-0 z-[10000]">
                  <button @click="openLikes"
                    class="group/button flex items-center justify-center gap-1 pl-[0.9375rem] pr-2 py-1 bg-light-bg-button dark:bg-dark-bg-button [clip-path:polygon(0_0,100%_0,105%_105%,16%_105%)] rounded-none border-none outline-none hover/container:bg-light-primary dark:hover/container:bg-dark-primaryHover">
                    <span
                      class="text-xs font-medium leading-[1.125rem] font-sans text-light-primary dark:text-dark-primary group-hover/button:text-white dark:group-hover/button:text-[#e8e6e3]">Trend</span>
                    <span>
                      <img src="https://i.ibb.co.com/7dh1cRfK/svgviewer-png-output-2.webp" alt="expand"
                        class="w-[.875rem] h-[.875rem] group-hover/button:[filter:brightness(0)_invert(1)]" />
                    </span>
                  </button>
                </div>
                <!-- title -->
                <div class="flex items-center gap-2">
                  <h3
                    class="m-0 font-medium font-sans text-base leading-6 text-light-text-secondary dark:text-dark-text-secondary">
                    Likes
                  </h3>
                </div>

                <!-- data-content (media-merch) -->
                <div
                  class="flex flex-col flex-grow flex-shrink [flex-basis: auto] justify-center items-start gap-4 min-w-0 min-h-0">
                  <div class="flex items-center gap-6 w-full flex-grow flex-shrink [flex-basis: auto] min-w-0 min-h-0">
                    <div class="flex flex-col gap-2 w-full flex-shrink items-start">
                      <span
                        class="text-xs font-medium font-sans leading-[1.125rem] whitespace-nowrap text-light-text-tertiary dark:text-dark-text-tertiary">MEDIA</span>

                      <div class="flex items-end justify-between w-full gap-1">
                        <span
                          class="text-[1.875rem] font-sans font-semibold leading-[2.375rem] text-light-text-primary dark:text-dark-text-primary">
                          {{ store.likes?.media ?? '--' }}</span>
                        <div v-if="
                          store.likes?.mediaPercentage !== undefined &&
                          store.likes?.mediaPercentage !== null
                        " class="flex flex-col items-center gap-1">
                          <span class="flex gap-1">
                            <span
                              class="text-light-text-primary dark:text-dark-text-primary leading-5 text-sm font-medium">{{
                                store.likes?.mediaPercentage }}%</span>
                          </span>
                          <span
                            class="-ml-4 text-light-text-secondary dark:text-dark-text-secondary leading-[1.125rem] text-xs">vs
                            yesterday</span>
                        </div>
                      </div>
                    </div>

                    <div class="flex flex-col gap-2 w-full flex-shrink items-start">
                      <span
                        class="text-xs font-medium font-sans leading-[1.125rem] whitespace-nowrap text-light-text-tertiary dark:text-dark-text-tertiary">MERCH</span>

                      <div class="flex items-end justify-between w-full gap-1">
                        <span
                          class="text-[1.875rem] font-sans font-semibold leading-[2.375rem] text-light-text-primary dark:text-dark-text-primary">{{
                            store.likes?.merch ?? '--' }}</span>
                        <div v-if="
                          store.likes?.merchPercentage !== undefined &&
                          store.likes?.merchPercentage !== null
                        " class="flex flex-col items-center gap-1">
                          <span class="flex gap-1">
                            <span
                              class="text-light-text-primary dark:text-dark-text-primary leading-5 text-sm font-medium">{{
                                store.likes?.merchPercentage }}%</span>
                          </span>
                          <span
                            class="-ml-4 text-light-text-secondary dark:text-dark-text-secondary leading-[1.125rem] text-xs">vs
                            yesterday</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- data-content (profile-feed) -->
                <div
                  class="flex flex-col flex-grow flex-shrink [flex-basis: auto] justify-center items-start gap-4 min-w-0 min-h-0">
                  <div class="flex items-center gap-6 w-full flex-grow flex-shrink [flex-basis: auto] min-w-0 min-h-0">
                    <div class="flex flex-col gap-2 w-full flex-shrink items-start">
                      <span
                        class="text-xs font-medium font-sans leading-[1.125rem] whitespace-nowrap text-light-text-tertiary dark:text-dark-text-tertiary">PROFILE</span>

                      <div class="flex items-end justify-between w-full gap-1">
                        <span
                          class="text-[1.875rem] font-semibold font-sans leading-[2.375rem] text-light-text-primary dark:text-dark-text-primary">{{
                            store.likes?.profile ?? '--' }}</span>
                        <div v-if="
                          store.likes?.profilePercentage !== undefined &&
                          store.likes?.profilePercentage !== null
                        " class="flex flex-col items-center gap-1">
                          <span class="flex gap-1">
                            <span
                              class="text-light-text-primary dark:text-dark-text-primary leading-5 text-sm font-medium">{{
                                store.likes?.profilePercentage }}%</span>
                          </span>
                          <span
                            class="-ml-4 text-light-text-secondary dark:text-dark-text-secondary leading-[1.125rem] text-xs">vs
                            yesterday</span>
                        </div>
                      </div>
                    </div>

                    <div class="flex flex-col gap-2 w-full flex-shrink items-start">
                      <span
                        class="text-xs font-medium leading-[1.125rem] font-sans whitespace-nowrap text-light-text-tertiary dark:text-dark-text-tertiary">FEED</span>

                      <div class="flex items-end justify-between w-full gap-1">
                        <span
                          class="text-[1.875rem] font-semibold leading-[2.375rem] font-sans text-light-text-primary dark:text-dark-text-primary">{{
                            store.likes?.feed ?? '--' }}</span>
                        <div v-if="
                          store.likes?.feedPercentage !== undefined &&
                          store.likes?.feedPercentage !== null
                        " class="flex flex-col items-center gap-1">
                          <span class="flex gap-1">
                            <span
                              class="text-light-text-primary dark:text-dark-text-primary leading-5 text-sm font-medium">{{
                                store.likes?.feedPercentage }}%</span>
                          </span>
                          <span
                            class="-ml-4 text-light-text-secondary dark:text-dark-text-secondary leading-[1.125rem] text-xs">vs
                            yesterday</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </DashboardOrderCard>
          </div>

          <!-- right-column -->
          <div class="flex flex-col gap-4 col-span-full xl:col-auto">
            <!-- top contributors -->
            <DashboardOrderCard>
              <div class="flex flex-col gap-4 min-w-0">
                <!-- hover-overlay -->
                <div
                  class="absolute hidden group-hover/container:flex items-start justify-end w-full h-full top-0 left-0 z-[10000]">
                  <button @click="openContributors"
                    class="group/button flex items-center justify-center gap-1 pl-[0.9375rem] pr-2 py-1 bg-light-bg-button dark:bg-dark-bg-button [clip-path:polygon(0_0,100%_0,105%_105%,16%_105%)] rounded-none border-none outline-none hover/container:bg-light-primary dark:hover/container:bg-dark-primaryHover">
                    <span
                      class="text-xs font-sans font-medium leading-[1.125rem] text-light-primary dark:text-dark-primary group-hover/button:text-white dark:group-hover/button:text-[#e8e6e3]">Trend</span>
                    <span>
                      <img src="https://i.ibb.co.com/7dh1cRfK/svgviewer-png-output-2.webp" alt="expand"
                        class="w-[.875rem] h-[.875rem] group-hover/button:[filter:brightness(0)_invert(1)]" />
                    </span>
                  </button>
                </div>

                <!-- title -->
                <div class="flex items-center gap-2">
                  <h3
                    class="m-0 font-medium font-sans text-base leading-6 text-light-text-secondary dark:text-dark-text-secondary">
                    Top Contributors
                  </h3>
                </div>
              </div>

              <!-- data-table -->
              <div class="flex-grow flex-shrink [flex-basis:auto] min-w-0 min-h-0 -mx-4 -mb-4">
                <FlexTable :columns="contributorsColumns" :rows="contributorsRows" :theme="contributorsTheme">
                  <!-- Custom Fan Cell (Rank + Avatar + Info) -->
                  <template #cell.fan="{ row }">
                    <div class="flex items-center gap-2.5 px-3 w-full">
                      <!-- Rank -->
                      <div class="w-5 h-5 bg-black flex items-center justify-center shrink-0">
                        <span class="text-white text-sm font-bold leading-5">{{ row.rank }}</span>
                      </div>
                      <!-- User Info -->
                      <div class="flex flex-col justify-center items-start gap-0.5 overflow-hidden">
                        <div class="truncate text-gray-900 text-xs font-semibold leading-4">{{ row.name }}</div>
                        <div class="flex items-center gap-1">
                          <div class="w-5 h-5 relative rounded-full overflow-hidden shrink-0 border border-black/10">
                            <img :src="row.avatar" class="w-full h-full object-cover" />
                          </div>
                          <span class="truncate text-slate-700 text-xs font-normal leading-4">{{ row.handle }}</span>
                        </div>
                      </div>
                    </div>
                  </template>

                  <!-- Custom Total Cell -->
                  <template #cell.total="{ row }">
                    <div class="px-4 w-full text-right">
                      <span class="text-gray-900 text-xs font-semibold leading-4 whitespace-nowrap">{{ row.total
                        }}</span>
                    </div>
                  </template>
                  <template #empty>
                    <div class="flex flex-col items-center justify-center w-full gap-4 py-8">
                      <img src="https://i.ibb.co.com/vx2RDHM3/svgviewer-png-output-3.webp" alt="No contributors"
                        class="w-24 h-24" />
                      <span class="text-base font-medium text-light-text-secondary dark:text-dark-text-secondary">No top
                        contributors yet</span>
                      <a href="#" class="text-sm text-primary-600 underline">Learn how to earn</a>
                    </div>
                  </template>
                </FlexTable>
              </div>
            </DashboardOrderCard>
          </div>
        </div>
      </div>
    </DashboardOrdersPageContentCreator>

    <!-- Orders Received section -->
    <OrdersReceivedTable />

    <!-- Trends Section -->
    <DashboardOrdersPageContentCreator>
      <div class="relative gap-6 flex flex-col">
        <!-- section-header -->
        <div class="flex flex-col gap-4 sm:flex-row px-4 pt-4 pb-0 justify-between items-start md:items-center">
          <!-- title -->
          <div class="title flex items-center gap-2 flex-grow flex-shrink basis-auto min-w-0 min-h-0">
            <span>
              <img src="https://i.ibb.co.com/wrrYKHLv/svgviewer-png-output-6.webp" alt="trends" class="w-6 h-6" />
            </span>
            <h2
              class="m-0 text-light-text-quaternary font-sans dark:text-dark-text-quaternary text-xl leading-[1.875rem] font-medium">
              Trends
            </h2>
          </div>

          <!-- tabs-button-group -->
          <div class="flex flex-col md:flex-row md:items-center gap-4 w-full sm:w-auto">
            <!-- last-date -->
            <!-- <div class="flex items-center gap-4 w-full justify-between sm:justify-end sm:w-auto">
              <span class="text-sm leading-5 font-sans text-light-text-quaternary dark:text-dark-text-quaternary">Last
                updated at
                <span class="text-sm leading-5 font-sans text-light-text-quaternary dark:text-dark-text-quaternary">7:14
                  PM</span></span>
              <button
                class="group flex items-center justify-center gap-1 pl-[0.9375rem] pr-2 py-1 bg-light-bg-button dark:bg-dark-bg-button [clip-path:polygon(0_0,100%_0,105%_105%,16%_105%)] rounded-none hover:bg-light-primary dark:hover:bg-dark-primaryHover [outline: none] border-0">
                <span>
                  <img src="https://i.ibb.co.com/tPv74nnJ/svgviewer-png-output-1.webp" alt="refresh"
                    class="w-[.875rem] h-[.875rem] group-hover:[filter:brightness(0)_invert(1)]" />
                </span>
                <span
                  class="text-xs font-medium font-sans leading-[1.125rem] text-light-primary dark:text-dark-primary group-hover:text-white dark:group-hover:text-[#e8e6e3]">Refresh</span>
              </button>
            </div> -->

            <!-- tabs -->
            <div
              class="trends-tabs-wrapper hidden md:flex w-full lg:w-auto bg-white/30 rounded-lg justify-start items-start overflow-hidden border border-gray-200">
              <div v-for="tab in trendsTabs" :key="tab" @click="selectedTrendTab = tab" :class="[
                'flex-1 lg:flex-initial whitespace-nowrap trends-tabs-wrapper-button cursor-pointer h-full px-4 py-2 flex justify-center items-center gap-2 transition-all font-[\'Poppins\'] text-sm outline-none border-r border-gray-200 last:border-r-0',
                selectedTrendTab === tab ? 'bg-gray-50 text-gray-800 font-bold' : 'bg-transparent text-gray-500 font-medium hover:bg-gray-50'
              ]">
                {{ tab }}
              </div>
            </div>

            <!-- select-dropdown -->
            <div class="md:hidden relative w-full sm:w-auto">
              <button @click="isTrendDropdownOpen = !isTrendDropdownOpen"
                class="w-full sm:w-[200px] px-4 py-2 bg-white/70 backdrop-blur-md border border-gray-200 rounded-lg flex justify-center gap-2 items-center outline-none hover:bg-white/90 transition-colors">
                <span class="text-gray-900 font-semibold text-sm">{{ selectedTrendTab }}</span>
                <div class="w-4 h-4 flex items-center justify-center transition-transform"
                  :class="{ 'rotate-180': isTrendDropdownOpen }">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.5 4.5L6 8L9.5 4.5" stroke="#667085" stroke-width="1.5" stroke-linecap="round"
                      stroke-linejoin="round" />
                  </svg>
                </div>
              </button>
              <div v-if="isTrendDropdownOpen"
                class="absolute right-0 z-20 w-full sm:w-[200px] top-full mt-1.5 bg-white/90 backdrop-blur-md border border-gray-200 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden animate-in fade-in zoom-in duration-200">
                <div v-for="tab in trendsTabs" :key="tab" @click="selectedTrendTab = tab; isTrendDropdownOpen = false"
                  :class="[
                    'px-4 py-3 text-sm transition-colors cursor-pointer text-center',
                    selectedTrendTab === tab ? 'bg-blue-50/80 text-blue-700 font-bold' : 'text-gray-600 hover:bg-gray-50/80'
                  ]">
                  {{ tab }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- all-analytics-data -->
        <div class="analytics-container px-4 pt-0 pb-4 flex flex-col gap-4">
          <!-- row -->
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3">
            <TopMediaTable :period="selectedTrendTab.toLowerCase()" />
            <TopTagsTable :period="selectedTrendTab.toLowerCase()" />
            <TopMerchTable :period="selectedTrendTab.toLowerCase()" />
            <TopCountriesTable :period="selectedTrendTab.toLowerCase()" />
          </div>
        </div>


      </div>
    </DashboardOrdersPageContentCreator>

    <!-- Subscribers popup -->
    <SubscribersTrendPopup v-model="isSubscribersOpen" v-model:period="subscribersPeriod"
      :insight-data="currentSubscribersInsightData" />



    <!-- Earnings popup -->
    <EarningsTrendPopup v-model="isEarningsOpen" v-model:period="earningsPeriod"
      :insight-data="currentEarningsInsightData" />


    <!-- fans popup -->
    <FansTrendPopup v-model="isFansOpen" v-model:period="fansPeriod" :insight-data="currentFansInsightData" />


    <!-- likes popup -->
    <LikesTrendPopup v-model="isLikesOpen" v-model:period="likesPeriod" :insight-data="currentLikesInsightData" />

    <!-- contributors popup -->
    <ContributorsTrendPopup v-model="isContributorsOpen" v-model:period="contributorsPeriod" :insight-data="contributorsRows" />

  </div>
</template>

<script setup>
import DashboardOrderCard from '@/components/ui/card/DashboardOrderCard.vue'
import DashboardOrdersPageContentCreator from './DashboardOrdersPageContentCreator.vue'
import DashboardTrendCard from '@/components/ui/card/DashboardTrendCard.vue'
import DashboardTrendContent from '@/components/ui/content/DashboardTrendContent.vue'
import { useDashboardAnalytics } from '@/store/DashboardAnalytics'
import { ref, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import TrendPopup from '@/components/ui/popup/TrendPopup.vue'
import EarningsTrendPopup from '@/components/ui/popup/EarningsTrendPopup.vue'
import SubscribersTrendPopup from '@/components/ui/popup/SubscribersTrendPopup.vue'
import FansTrendPopup from '@/components/ui/popup/FansTrendPopup.vue'
import LikesTrendPopup from '@/components/ui/popup/LikesTrendPopup.vue'
import ContributorsTrendPopup from '@/components/ui/popup/ContributorsTrendPopup.vue'
import FlexTable from '@/components/ui/tables/FlexTable.vue'
import OrdersReceivedTable from '@/components/ui/tables/OrdersReceivedTable.vue'
import TopMediaTable from '@/components/ui/tables/TopMediaTable.vue'
import TopTagsTable from '@/components/ui/tables/TopTagsTable.vue'
import TopMerchTable from '@/components/ui/tables/TopMerchTable.vue'
import TopCountriesTable from '@/components/ui/tables/TopCountriesTable.vue'

const store = useDashboardAnalytics()
const { lastUpdated } = storeToRefs(store)

// --- Contributors Table Data ---
const contributorsColumns = [
  { key: 'fan', label: 'Fan', grow: true, align: 'left' },
  { key: 'total', label: 'Total (USD)', basis: 'basis-32', align: 'right' }
]

const contributorsRows = computed(() => {
  if (!store.contributors || store.contributors.length === 0) return [];
  return store.contributors.slice(0, 5).map((c, index) => ({
    id: index + 1,
    rank: index + 1,
    name: c.name,
    handle: `@${c.name.replace(/\s+/g, '').toLowerCase()}`,
    avatar: '/images/mangoes.png',
    total: `USD$ ${c.tokens || 0}`
  }));
});

const contributorsTheme = {
  container: 'relative bg-transparent border-none w-full min-w-72 ',
  header: 'bg-transparent text-gray-500',
  headerRow: 'flex items-center',
  headerCell: 'px-4 py-2.5 text-sm font-normal border-b border-gray-500',
  row: 'flex items-center min-h-16 odd:bg-transparent even:bg-[#F2F4F780]  hover:bg-gray-100/30',
  cell: 'py-2 flex items-center h-full',
  footer: 'hidden'
}

// --- Earnings Top Countries Table ---
const earningsTopCountriesColumns = [
  { key: 'media', label: 'Media', grow: true, align: 'left' },
  { key: 'sales', label: 'Sales (USD)', basis: 'basis-32', align: 'right' }
]

const earningsTopCountriesTheme = {
  container: 'relative bg-transparent border-none w-full ',
  header: 'bg-transparent text-slate-600',
  headerRow: 'flex items-center',
  headerCell: 'px-3 py-3 text-xs font-medium border-b border-gray-500',
  row: 'flex items-center h-10 odd:bg-transparent even:bg-gray-100/80 transition-colors',
  cell: 'flex items-center h-10',
  footer: 'hidden'
}

// --- Fans Top Countries Table ---
const fansTopCountriesColumns = [
  { key: 'media', label: 'Countries', grow: true, align: 'left' },
  { key: 'visits', label: 'Profile Visits', basis: 'basis-32', align: 'right' }
]


const trendsTabs = ['Yearly', 'Monthly', 'Weekly', 'Daily']
const selectedTrendTab = ref('Daily')
const isTrendDropdownOpen = ref(false)

const subscribersPeriod = ref('yearly')
const earningsPeriod = ref('yearly')
const fansPeriod = ref('yearly')
const likesPeriod = ref('yearly')
const contributorsPeriod = ref('yearly')

function getVsLabel(period) {
  switch (period.toLowerCase()) {
    case 'daily': return 'vs last 24 hour'
    case 'weekly': return 'vs last week'
    case 'monthly': return 'vs last 30 days'
    case 'yearly': return 'vs last year'
    default: return 'vs yesterday'
  }
}

const currentEarningsInsightData = computed(() => {
  let tab = earningsPeriod.value.toLowerCase()
  if (tab === 'all-time') tab = 'yearly'
  const arr = store.earnings[tab]
  return arr && arr.length ? arr[arr.length - 1] : null
})

const currentSubscribersInsightData = computed(() => {
  let p = subscribersPeriod.value.toLowerCase()
  if (p === 'all-time') p = 'yearly'
  return store.subscribers[p] || { new: null, recurring: null }
})

const currentFansInsightData = computed(() => {
  let p = fansPeriod.value.toLowerCase()
  if (p === 'all-time') p = 'yearly'
  return store.fans[p] || { newFollowers: null, profileVisit: null }
})

const currentLikesInsightData = computed(() => {
  return store.likes || {}
})

const trendComparisonLabel = computed(() => {
  switch (selectedTrendTab.value) {
    case 'Daily': return 'vs last 24 hour'
    case 'Weekly': return 'vs last week'
    case 'Monthly': return 'vs last 30 days'
    case 'Yearly': return 'vs last year'
    default: return 'vs yesterday'
  }
})


// --- Subscribers popup state/config ---
const isSubscribersOpen = ref(false)
function openSubscribers() {
  isSubscribersOpen.value = true
}

const isEarningsOpen = ref(false)
function openEarnings() {
  isEarningsOpen.value = true
}

const isFansOpen = ref(false)
function openFans() {
  isFansOpen.value = true
}

const isLikesOpen = ref(false)
function openLikes() {
  isLikesOpen.value = true
}

const isContributorsOpen = ref(false)
function openContributors() {
  isContributorsOpen.value = true
}

// --- Popups State ---

function formatTime(dateString) {
  if (!dateString) return 'Never'
  const date = new Date(dateString)
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}



async function handleRefresh() {
  await store.loadAnalytics()
}

// when component load so data will be here
onMounted(async () => {
  await store.loadAnalytics();
  
  // Initialize the native charts
  setTimeout(() => {
    if (window.chartsHandler) {
      window.chartsHandler.initializeAll(true);
    }
  }, 500);
})

</script>
