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

    <DashboardOrdersPageContentCreator>
      <div class="flex flex-col justify-start items-start gap-6">
        <!-- Header & Tabs -->
        <div
          class="w-full px-4 pt-4 flex justify-between flex-col sm:flex-row md:flex-col lg:flex-row items-start sm:items-center md:items-start lg:items-center gap-4">
          <div class="flex justify-start  gap-2">
            <div class="w-6 h-6 flex items-center justify-center">
              <img src="/images/cartIcon.png" alt="Cart" class="w-5 h-5 opacity-70" />
            </div>
            <div class="text-gray-500 text-xl font-medium font-['Poppins'] leading-8">Order Received</div>
          </div>

          <!-- Tabs (Desktop) -->
          <div
            class="hidden md:flex w-full lg:w-auto bg-white/30 rounded-lg justify-start items-start overflow-hidden border border-gray-200">
            <div v-for="tab in orderTabs" :key="tab" @click="selectedTab = tab" :class="[
              'flex-1 lg:flex-initial whitespace-nowrap cursor-pointer h-full px-4 py-2 flex justify-center items-center gap-2 transition-all font-[\'Poppins\'] text-sm outline-none border-r border-gray-200 last:border-r-0',
              selectedTab === tab ? 'bg-white text-gray-800 font-bold' : 'bg-transparent text-gray-500 font-medium hover:bg-gray-50'
            ]">
              {{ tab }}
            </div>
          </div>

          <!-- Tabs Dropdown (Mobile) -->
          <div class="md:hidden relative w-full sm:w-auto">
            <button @click="isDropdownOpen = !isDropdownOpen"
              class="w-full sm:w-[200px] px-4 py-2 bg-white/70 backdrop-blur-md border border-gray-200 rounded-lg flex justify-center gap-2 items-center outline-none hover:bg-white/90 transition-colors">
              <span class="text-gray-900 font-semibold text-sm">{{ selectedTab }}</span>
              <div class="w-4 h-4 flex items-center justify-center transition-transform"
                :class="{ 'rotate-180': isDropdownOpen }">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.5 4.5L6 8L9.5 4.5" stroke="#667085" stroke-width="1.5" stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
              </div>
            </button>
            <div v-if="isDropdownOpen"
              class="absolute right-0 z-20 w-full sm:w-[200px] mt-1.5 bg-white/90 backdrop-blur-md border border-gray-200 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden animate-in fade-in zoom-in duration-200">
              <div v-for="tab in orderTabs" :key="tab" @click="selectedTab = tab; isDropdownOpen = false" :class="[
                'px-4 py-3 text-sm transition-colors cursor-pointer text-center',
                selectedTab === tab ? 'bg-blue-50/80 text-blue-700 font-bold' : 'text-gray-600 hover:bg-gray-50/80'
              ]">
                {{ tab }}
              </div>
            </div>
          </div>
        </div>

        <!-- Table -->
        <div class="self-stretch w-full">
          <div v-if="currentRows && currentRows.length > 0" class="w-full">
            <FlexTable :columns="currentColumns" :rows="currentRows" :theme="ordersTheme">
              <!-- Order Slot -->
              <template #cell.order="{ row }">
                <!-- Desktop View (Visible on md and up) -->
                <div class="hidden md:flex items-center gap-4 h-full w-full pr-4">
                  <div v-if="selectedTab === 'Merch' || selectedTab === 'Custom Request'"
                    :class="['w-[4rem] h-full flex-shrink-0 grid place-items-center', row.bg]">
                    <img :src="row.bg === 'bg-black' ? '/images/merch.png' : '/images/cartIcon.png'"
                      class="w-8 h-8 object-contain" />
                  </div>
                  <div v-else class="relative w-[3.5rem] sm:w-[4rem] h-[6rem] flex-shrink-0 -my-2 -ml-2.5">
                    <img src="/images/profile-thumbnail.png" class="w-full h-full object-cover" />
                  </div>
                  <div class="flex flex-col justify-center items-start gap-0.5 overflow-hidden">
                    <div v-if="row.tier"
                      class="self-stretch text-gray-900 text-sm font-semibold leading-tight line-clamp-1">{{ row.tier }}
                    </div>
                    <div v-else-if="row.title"
                      class="self-stretch justify-start text-gray-900 text-xs font-semibold font-['Poppins'] leading-4 line-clamp-2">
                      {{ row.title }}</div>
                    <div v-else-if="row.type"
                      class="self-stretch justify-start text-gray-900 text-xs font-semibold font-['Poppins'] leading-4 line-clamp-2">
                      {{ row.type }}</div>
                    <div class="self-stretch text-slate-500 text-xs font-normal leading-4 line-clamp-1">{{ row.orderId
                      }}</div>
                  </div>
                </div>

                <!-- Mobile View (Visible below md) -->
                <div class="flex md:hidden items-center gap-3 h-full w-full py-2">
                  <div v-if="selectedTab === 'Merch' || selectedTab === 'Custom Request'"
                    :class="['h-full w-16 shrink-0 grid place-items-center', row.bg]">
                    <img :src="row.bg === 'bg-black' ? '/images/merch.png' : '/images/cartIcon.png'"
                      class="w-10 h-10 object-contain" />
                  </div>
                  <div v-else class="h-16 w-16 shrink-0 rounded overflow-hidden">
                    <img src="/images/profile-thumbnail.png" class="w-full h-full object-cover" />
                  </div>
                  <div class="flex flex-col justify-center items-start gap-1 overflow-hidden">
                    <div class="flex items-center gap-1.5 text-slate-400 text-[11px] font-normal">
                      <span>{{ row.orderId }}</span>
                      <span>{{ row.date }}</span>
                    </div>
                    <div class="flex items-center gap-1.5">
                      <img src="/images/mangoes.png" class="w-4 h-4 rounded-full border border-black/5" />
                      <span class="text-slate-500 text-[11px] font-normal">{{ row.handle }}</span>
                    </div>
                  </div>
                </div>
              </template>

              <!-- From Slot -->
              <template #cell.from="{ row }">
                <div class="flex items-center gap-2 px-4 w-full h-full">
                  <div class="w-6 h-6 rounded-full overflow-hidden shrink-0 border border-black/5">
                    <img src="/images/mangoes.png" class="w-full h-full object-cover" />
                  </div>
                  <span class="truncate text-slate-700 text-[13px] font-normal">{{ row.handle }}</span>
                </div>
              </template>

              <!-- Status Slot -->
              <template #cell.status="{ row }">
                <div class="flex items-center h-full px-4 w-full">
                  <div class="p-1 bg-yellow-400 backdrop-blur-[10px] flex justify-center items-center gap-2">
                    <img src="/images/mangoes.png" class="w-4 h-4 object-cover" />
                  </div>
                  <div class="h-6 px-1.5 py-[3px] bg-black backdrop-blur-[10px] flex justify-center items-center gap-2">
                    <div class="justify-start text-yellow-400 text-xs font-medium font-['Poppins'] leading-4">{{
                      row.status }}</div>
                  </div>
                </div>
              </template>

              <!-- Date Slot -->
              <template #cell.date="{ row }">
                <div class="px-4 text-slate-600 text-[13px] font-normal h-full flex items-center">{{ row.date }}</div>
              </template>

              <!-- Total Slot -->
              <template #cell.total="{ row }">
                <div
                  class="pr-4 text-gray-900 text-[13px] font-bold h-full flex items-center justify-end md:justify-start w-full whitespace-nowrap">
                  <span>USD$</span> 9.99
                </div>
              </template>

              <!-- Details Slot (Hover) -->
              <template #cell.details>
                <div
                  class="px-4 flex items-center justify-end gap-1.5 opacity-0 group-hover/row:opacity-100 transition-opacity cursor-pointer h-full w-full bg-gradient-to-l from-white/80 via-white/40 to-transparent">
                  <span class="hidden lg:inline text-blue-600 text-[13px] font-normal whitespace-nowrap">Details</span>
                  <div class="w-3.5 h-3.5 flex items-center justify-center">
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 11L11 1M11 1H4M11 1V8" stroke="#2563EB" stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round" />
                    </svg>
                  </div>
                </div>
              </template>

            </FlexTable>
          </div>
          <!-- Empty State -->
          <div v-else class="py-12 flex flex-col justify-center items-center gap-4 w-full">
            <img src="/images/shopping-cart.png" alt="Empty Cart" class="w-32 h-32 opacity-80" />
            <div class="flex flex-col items-center gap-1">
              <p class="text-slate-700 text-base font-normal">You don’t have any orders at the moment</p>
              <a href="#" class="text-slate-700 text-base font-normal underline decoration-slate-400">Learn how
                you
                can earn</a>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="w-full flex justify-end">
          <button
            class="inline-flex items-center gap-2.5 pr-2 pl-6 py-1 bg-white border border-gray-200 rounded-none [clip-path:polygon(0_100%,100%_100%,100%_0,16%_0)] shadow-sm hover:bg-gray-50 transition-colors">
            <span class="text-blue-700 text-base font-medium">All Orders</span>
            <span class="text-blue-700 text-[10px] font-bold -translate-y-2 -ml-1">5</span>
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 5H13M13 5L9 1M13 5L9 9" stroke="#1D4ED8" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </DashboardOrdersPageContentCreator>

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
            <!-- white-card-column-container (media) -->
            <div class="col-span-full xl:col-span-2 gap-4 w-full order-0 flex flex-col">
              <!-- white-card -->
              <DashboardTrendCard>
                <!-- tabs-container -->
                <div
                  class="w-full px-4 flex justify-between flex-col sm:flex-row md:flex-col lg:flex-row items-start sm:items-center md:items-start lg:items-center gap-4">
                  <!-- title -->
                  <div class="flex items-center gap-2">
                    <h3 class="text-slate-700 m-0 leading-6 text-base font-medium font-['Poppins']">
                      Top Media
                    </h3>
                  </div>

                  <!-- tabs-button-group -->
                  <div
                    class="flex w-full sm:w-auto bg-white/30 rounded-lg justify-start items-start overflow-hidden border border-gray-200 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]">
                    <div v-for="tab in topMediaTabs" :key="tab" @click="selectedTopMediaTab = tab" :class="[
                      'flex-1 sm:flex-initial whitespace-nowrap cursor-pointer h-full px-4 py-2 flex justify-center items-center gap-2 transition-all font-[\'Poppins\'] text-sm outline-none border-r border-gray-200 last:border-r-0',
                      selectedTopMediaTab === tab ? 'bg-white text-gray-800 font-bold' : 'bg-transparent text-gray-500 font-medium hover:bg-gray-50'
                    ]">
                      {{ tab }}
                    </div>
                  </div>
                </div>

                <!-- tabs-content -->
                <div v-if="(selectedTopMediaTab === 'Views' ? topMediaRows : p2vSalesRows).length > 0"
                  class="w-full flex-1 pt-4">
                  <FlexTable :columns="selectedTopMediaTab === 'Views' ? topMediaColumns : p2vSalesColumns"
                    :rows="selectedTopMediaTab === 'Views' ? topMediaRows : p2vSalesRows" :theme="topMediaTheme">
                    <template #cell.media="{ row }">
                      <div class="flex items-center gap-3 h-full">
                        <div class="relative w-[3.5rem] sm:w-[5rem] h-[6rem] flex-shrink-0 -my-2 -ml-2.5">
                          <img :src="row.image" alt="media" class="w-full h-full object-cover">
                          <div class="w-5 h-5 left-0 top-0 absolute bg-black flex justify-center items-center">
                            <span class="text-white text-xs font-bold font-['Poppins'] leading-5">{{ row.rank }}</span>
                          </div>
                        </div>
                        <div
                          class="text-gray-900 text-xs font-semibold font-['Poppins'] leading-4 line-clamp-2 md:line-clamp-3">
                          {{ row.title }}
                        </div>
                      </div>
                    </template>
                    <template #cell.clicks="{ row }">
                      <div class="text-center w-full text-gray-900 text-xs font-semibold font-['Poppins'] leading-4">
                        {{ row.clicks }}
                      </div>
                    </template>
                    <template #cell.duration="{ row }">
                      <div class="text-right w-full text-gray-900 text-xs font-semibold font-['Poppins'] leading-4">
                        {{ row.duration }}
                      </div>
                    </template>
                    <template #cell.sales_count="{ row }">
                      <div
                        class="text-center w-full text-gray-900 text-xs font-semibold font-['Poppins'] leading-4 truncate sm:px-1">
                        {{ row.sales_count }}
                      </div>
                    </template>
                    <template #cell.sales_usd="{ row }">
                      <div
                        class="text-right w-full text-gray-900 text-xs font-semibold font-['Poppins'] leading-4 truncate sm:px-1">
                        {{ row.sales_usd }}
                      </div>
                    </template>
                  </FlexTable>
                </div>
                <DashboardTrendContent v-else image="https://i.ibb.co.com/vx2RDHM3/svgviewer-png-output-3.webp"
                  alt="list" message="No trend to show at the moment" link="#" linkText="Learn ways to earn" />
              </DashboardTrendCard>
            </div>

            <!-- white-card-column-container (tags) -->
            <div class="second-white-card-column w-full gap-4 order-2 xl:order-1 flex flex-col">
              <!-- white-card -->
              <DashboardTrendCard>
                <!-- tabs-container -->
                <div>
                  <!-- title -->
                  <div class="flex items-center justify-between gap-2 px-[16px]">
                    <h3
                      class="text-light-text-secondary font-sans dark:text-dark-text-secondary m-0 leading-6 text-base font-medium">
                      Top Tags
                    </h3>
                  </div>
                </div>
                <!-- table-content -->
                <div v-if="topTagsRows && topTagsRows.length > 0" class="w-full h-full pt-4">
                  <FlexTable :columns="topTagsColumns" :rows="topTagsRows" :theme="topTagsTheme">
                    <!-- tag column -->
                    <template #cell.tag="{ row }">
                      <div class="flex justify-start items-center gap-2.5 h-full w-full sm:px-1">
                        <div class="w-5 h-5 bg-black flex justify-center items-center shrink-0">
                          <span class="text-white text-sm font-bold font-['Poppins']">{{ row.rank }}</span>
                        </div>
                        <div
                          class="px-1.5 py-0.5 bg-gray-200 rounded-md border border-gray-200 flex justify-start items-center">
                          <span class="text-slate-700 text-xs font-medium font-['Poppins']">{{ row.name }}</span>
                        </div>
                      </div>
                    </template>

                    <!-- views column -->
                    <template #cell.views="{ row }">
                      <div class="text-gray-900 text-xs font-semibold font-['Poppins'] text-right w-full sm:px-1">
                        {{ row.views }}
                      </div>
                    </template>
                  </FlexTable>
                </div>
                <!-- empty-state -->
                <DashboardTrendContent v-else image="https://i.ibb.co.com/vx2RDHM3/svgviewer-png-output-3.webp"
                  alt="list" message="No trend to show at the moment" link="#" linkText="Learn ways to earn" />
              </DashboardTrendCard>
            </div>

            <!-- white-card-column-container (merch) -->
            <div class="third-white-card-column col-span-full gap-4 w-full order-1 xl:col-span-2 flex flex-col">
              <!-- white-card -->
              <DashboardTrendCard>
                <!-- tabs-container -->
                <div>
                  <!-- title -->
                  <div class="flex items-center justify-between gap-2 px-[16px]">
                    <h3
                      class="text-light-text-secondary font-sans dark:text-dark-text-secondary m-0 leading-6 text-base font-medium">
                      Top Merch
                    </h3>
                  </div>
                </div>

                <!-- table-content -->
                <div v-if="topMerchRows && topMerchRows.length > 0" class="w-full flex-1 pt-4">
                  <FlexTable :columns="topMerchColumns" :rows="topMerchRows" :theme="topMerchTheme">
                    <!-- merch column -->
                    <template #cell.merch="{ row }">
                      <div class="flex items-center gap-3 h-full w-full">
                        <div class="relative w-[3.5rem] sm:w-[4rem] h-[6rem] flex-shrink-0 -my-2 -ml-2.5">
                          <img :src="row.image" alt="merch" class="w-full h-full object-cover">
                          <div class="w-5 h-5 left-0 top-0 absolute bg-black flex justify-center items-center">
                            <span class="text-white text-sm font-bold font-['Poppins'] leading-none">{{ row.rank
                              }}</span>
                          </div>
                        </div>
                        <div
                          class="text-gray-900 text-xs font-semibold font-['Poppins'] leading-4 line-clamp-2 md:line-clamp-3 w-[200px] text-wrap text-left whitespace-normal break-words sm:px-1">
                          {{ row.title }}
                        </div>
                      </div>
                    </template>

                    <!-- views column -->
                    <template #cell.views="{ row }">
                      <div
                        class="text-right w-full text-gray-900 text-xs font-semibold font-['Poppins'] leading-4 truncate sm:px-1">
                        {{ row.views }}
                      </div>
                    </template>

                    <!-- sales column -->
                    <template #cell.sales="{ row }">
                      <div
                        class="text-right w-full text-gray-900 text-xs font-semibold font-['Poppins'] leading-4 truncate sm:px-1">
                        {{ row.sales }}
                      </div>
                    </template>
                  </FlexTable>
                </div>
                <!-- empty-state -->
                <DashboardTrendContent v-else image="https://i.ibb.co.com/vx2RDHM3/svgviewer-png-output-3.webp"
                  alt="list" message="No trend to show at the moment" link="#" linkText="Learn ways to earn" />
              </DashboardTrendCard>
            </div>

            <!-- white-card-column-container (countries) -->
            <div class="fourth-white-card-column w-full gap-4 order-3 flex flex-col">
              <!-- white-card -->
              <DashboardTrendCard>
                <!-- tabs-container -->
                <div>
                  <!-- title -->
                  <div class="flex items-center justify-between gap-2 px-[16px]">
                    <h3
                      class="text-light-text-secondary font- dark:text-dark-text-secondary m-0 leading-6 text-base font-medium">
                      Top Countries
                    </h3>
                  </div>
                </div>

                <!-- table-content -->
                <div v-if="topCountriesRows && topCountriesRows.length > 0" class="w-full flex-1 pt-4">
                  <FlexTable :columns="topCountriesColumns" :rows="topCountriesRows" :theme="topCountriesTheme">
                    <!-- tags column -->
                    <template #cell.tags="{ row }">
                      <div class="flex justify-start items-center gap-2.5 h-full w-full sm:px-1">
                        <div class="w-5 h-5 bg-black flex justify-center items-center shrink-0">
                          <span class="text-white text-sm font-bold font-['Poppins']">{{ row.rank }}</span>
                        </div>
                        <div class="flex-1 text-gray-900 text-xs font-semibold font-['Poppins'] leading-4 line-clamp-2">
                          {{ row.country }}
                        </div>
                      </div>
                    </template>

                    <!-- sales column -->
                    <template #cell.sales="{ row }">
                      <div
                        class="text-right w-full text-gray-900 text-xs font-semibold font-['Poppins'] leading-4 truncate sm:px-1">
                        {{ row.sales }}
                      </div>
                    </template>
                  </FlexTable>
                </div>
                <!-- empty-state -->
                <DashboardTrendContent v-else image="https://i.ibb.co.com/vx2RDHM3/svgviewer-png-output-3.webp"
                  alt="list" message="No trend to show at the moment" link="#" linkText="Learn ways to earn" />
              </DashboardTrendCard>
            </div>
          </div>
        </div>


      </div>
    </DashboardOrdersPageContentCreator>

    <!-- Subscribers popup -->
    <TrendPopup v-model="isSubscribersOpen" v-model:period="subscribersPeriod" title="Subscriptions Insight"
      logo="https://i.ibb.co.com/MyhfGRNH/svgviewer-png-output-12.webp">
      <div class="flex flex-col gap-4">
        <!-- row -->
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <!-- left-column -->
          <div
            class="flex w-full flex-col gap-4 rounded-[0.125rem] border-r border-light-border-primary bg-light-bg-container p-4 text-center backdrop-blur-[25px] dark:border-dark-border-primary dark:bg-dark-bg-container">
            <h3 class="text-light-text-darkgray dark:text-white text-base leading-7 md:text-lg font-semibold">
              New Subscribers
            </h3>

            <div class="flex flex-col justify-center items-center gap-4">
              <span
                class="text-gray-900 tracking-[-0.045rem] text-3xl leading-[2.375rem] font-semibold md:text-4xl md:leading-[2.75rem]">
                {{ currentSubscribersInsightData.new ? currentSubscribersInsightData.new.toLocaleString() : '--' }}
              </span>

              <div class="inline-flex items-center gap-2">
                <div class="w-14 flex justify-center items-center gap-1">
                  <img src="https://i.ibb.co.com/93tZHrmQ/svgviewer-png-output-4.webp" alt="trend-up"
                    class="h-5 w-5" />
                  <div
                    class="text-center text-emerald-700 text-sm font-medium font-['Poppins'] leading-5">
                    20%
                  </div>
                </div>
                <div class=" text-slate-700 text-xs font-normal font-['Poppins'] leading-4">{{ getVsLabel(subscribersPeriod) }}
                </div>
              </div>
            </div>
          </div>

          <div
            class="flex w-full flex-col gap-4 rounded-[0.125rem] bg-light-bg-container p-4 text-center backdrop-blur-[25px] dark:bg-dark-bg-container">
            <h3 class="text-light-text-darkgray dark:text-white text-base leading-7 md:text-lg font-semibold">
              Recurring Subscribers
            </h3>

            <div class="flex flex-col justify-center items-center gap-4">
              <span
                class="text-gray-900 tracking-[-0.045rem] text-3xl leading-[2.375rem] font-semibold md:text-4xl md:leading-[2.75rem]">
                {{ currentSubscribersInsightData.recurring ? currentSubscribersInsightData.recurring.toLocaleString() : '--' }}
              </span>

              <div class="inline-flex items-center gap-2">
                <div class="w-14 flex justify-center items-center gap-1">
                  <img src="https://i.ibb.co.com/93tZHrmQ/svgviewer-png-output-4.webp" alt="trend-up"
                    class="h-5 w-5" />
                  <div
                    class="text-center text-emerald-700 text-sm font-medium font-['Poppins'] leading-5">
                    20%
                  </div>
                </div>
                <div class=" text-slate-700 text-xs font-normal font-['Poppins'] leading-4">{{ getVsLabel(subscribersPeriod) }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- row -->
        <div class="flex flex-col md:flex-row gap-4">
          <!-- left-column -->
          <div class="flex flex-col gap-4 p-4 w-full h-[25.875rem] bg-light-bg-container dark:bg-dark-bg-container">
            <h3 class="text-base font-medium leading-6 text-[#0C111D] dark:text-[#dbd8d3]">
              Subscriptions Insight
            </h3>

            <div class="flex flex-col justify-center items-center gap-6 h-full">
              <div class="flex justify-center items-center backdrop-blur-[50px] w-40 h-40">
                <img src="https://i.ibb.co.com/Kzh3f1Rr/pie-chart.png" alt="pie-chart" class="w-32 h-32" />
              </div>

              <div class="flex flex-col items-center text-center gap-2">
                <span class="text-base leading-6 text-light-text-secondary dark:text-dark-text-secondary">No trend to show
                  at
                  the moment</span>
                <a href="#" class="text-base leading-6">
                  <span
                    class="text-base leading-6 text-light-text-secondary dark:text-dark-text-secondary underline">Learn
                    ways to earn</span>
                </a>
              </div>
            </div>
          </div>

          <!-- right-column -->
          <div class="flex flex-col gap-4 p-4 w-full h-[25.875rem] bg-light-bg-container dark:bg-dark-bg-container">
            <h3 class="text-base font-medium leading-6 text-[#0C111D] dark:text-[#dbd8d3]">
              Tiers Breakdown
            </h3>

            <div class="flex flex-col justify-center items-center gap-6 h-full">
              <div class="flex justify-center items-center backdrop-blur-[50px] w-40 h-40">
                <img src="https://i.ibb.co.com/Kzh3f1Rr/pie-chart.png" alt="pie-chart" class="w-32 h-32" />
              </div>

              <div class="flex flex-col items-center text-center gap-2">
                <span class="text-base leading-6 text-light-text-secondary dark:text-dark-text-secondary">No trend to show
                  at
                  the moment</span>
                <a href="#" class="text-base leading-6">
                  <span
                    class="text-base leading-6 text-light-text-secondary dark:text-dark-text-secondary underline">Learn
                    ways to earn</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TrendPopup>


    <!-- Earnings popup -->
    <TrendPopup v-model="isEarningsOpen" v-model:period="earningsPeriod" title="Earnings Insight" logo="https://i.ibb.co.com/rGSXLKX4/money.webp">
      <div class="flex flex-col gap-4">

        <!-- row -->
        <div class="grid grid-cols-2">
          <div
            class="flex w-full flex-col gap-4 rounded-[0.125rem] border-r border-light-border-primary bg-light-bg-container p-4 text-center backdrop-blur-[25px] dark:border-dark-border-primary dark:bg-dark-bg-container">
            <h3 class="text-light-text-darkgray dark:text-white text-base leading-7 md:text-lg font-semibold">
              Total Earnings
            </h3>

            <div class="flex flex-col justify-center items-center gap-4">
              <template v-if="currentEarningsInsightData?.total">
                <div >
                  <span class="text-gray-900 text-4xl font-semibold font-['Poppins'] leading-10">{{ currentEarningsInsightData.total.toLocaleString() }} </span>
                  <span class="text-gray-900 text-xl font-bold font-['Poppins'] leading-8">USD</span>
                </div>
              </template>
              <span v-else
                class="text-gray-900 tracking-[-0.045rem] text-3xl leading-[2.375rem] font-semibold md:text-4xl md:leading-[2.75rem]">--</span>

              <div class="inline-flex  items-center gap-2">
                <div class="w-14 flex justify-center items-center gap-1">
                  <img src="https://i.ibb.co.com/93tZHrmQ/svgviewer-png-output-4.webp" alt="trend-up"
                    class="h-5 w-5" />
                  <div
                    class="text-center text-emerald-700 text-sm font-medium font-['Poppins'] leading-5">
                    20%
                  </div>
                </div>
                <div class=" text-slate-700 text-xs font-normal font-['Poppins'] leading-4">{{ getVsLabel(earningsPeriod) }}
                </div>
              </div>
            </div>
          </div>

          <div
            class="flex w-full flex-col gap-4 rounded-[0.125rem] bg-light-bg-container p-4 text-center backdrop-blur-[25px] dark:bg-dark-bg-container">
            <h3 class="text-light-text-darkgray dark:text-white text-base leading-7 md:text-lg font-semibold">
              Tokens Received
            </h3>

            <div class="flex flex-col justify-center items-center gap-4">
              <template v-if="currentEarningsInsightData?.totalTokens">
                <div class="text-gray-900 text-4xl font-semibold font-['Poppins'] leading-10">
                  {{ currentEarningsInsightData.totalTokens.toLocaleString() }}
                </div>
              </template>
              <span v-else
                class="text-gray-900 tracking-[-0.045rem] text-3xl leading-[2.375rem] font-semibold md:text-4xl md:leading-[2.75rem]">--</span>

              <div class="inline-flex  items-center gap-2">
                <div class="w-14 flex justify-center items-center gap-1">
                  <img src="https://i.ibb.co.com/93tZHrmQ/svgviewer-png-output-4.webp" alt="trend-up"
                    class="h-5 w-5" />
                  <div
                    class="text-center text-emerald-700 text-sm font-medium font-['Poppins'] leading-5">
                    20%
                  </div>
                </div>
                <div class=" text-slate-700 text-xs font-normal font-['Poppins'] leading-4">{{ getVsLabel(earningsPeriod) }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- row -->
        <div class="flex flex-col md:flex-row gap-4">
          <!-- left-column -->
          <div class="flex flex-col gap-4 p-4 w-full h-[25.875rem] bg-light-bg-container dark:bg-dark-bg-container">
            <div class="flex justify-between items-center gap-2">
              <h3 class="text-light-text-darkgray dark:text-white text-lg font-semibold">
                Sales Insight
              </h3>
            </div>

            <div class="flex flex-col justify-center items-center gap-6 h-full">
              <div class="flex justify-center items-center backdrop-blur-[50px] w-40 h-40">
                <img src="https://i.ibb.co.com/Kzh3f1Rr/pie-chart.png" alt="pie-chart" class="w-32 h-32" />
              </div>

              <div class="flex flex-col items-center gap-2">
                <span class="text-base leading-6 text-light-text-secondary dark:text-dark-text-secondary">No trend to
                  show
                  at the moment</span>
                <a href="#" class="text-base l
                eading-6">
                  <span
                    class="text-base leading-6 text-light-text-secondary dark:text-dark-text-secondary underline">Learn
                    ways to earn</span>
                </a>
              </div>
            </div>
          </div>

          <!-- right-column -->
          <div class="flex flex-col gap-4 p-4 w-full h-[25.875rem] bg-light-bg-container dark:bg-dark-bg-container">
            <div class="flex justify-between items-center gap-2">
              <h3 class="text-light-text-darkgray dark:text-white text-lg font-semibold">
                Tokens Trend
              </h3>
            </div>

            <div class="flex flex-col justify-center items-center gap-6 h-full">
              <div class="flex justify-center items-center backdrop-blur-[50px] w-40 h-40">
                <img src="https://i.ibb.co.com/Kzh3f1Rr/pie-chart.png" alt="pie-chart" class="w-32 h-32" />
              </div>

              <div class="flex flex-col items-center gap-2">
                <span class="text-base leading-6 text-light-text-secondary dark:text-dark-text-secondary">No trend to
                  show
                  at the moment</span>
                <a href="#" class="text-base leading-6">
                  <span
                    class="text-base leading-6 text-light-text-secondary dark:text-dark-text-secondary underline">Learn
                    ways to earn</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- row -->
        <div
          class="flex flex-col gap-4 p-4 rounded-sm bg-light-bg-container backdrop-blur-[25px] dark:bg-dark-bg-container">
          <h3 class="text-light-text-darkgray dark:text-white text-lg font-semibold">
            Top Countries
          </h3>

          <div v-if="currentEarningsInsightData?.topCountries?.length > 0" class="flex flex-col md:flex-row gap-8 w-full mt-2">
            <!-- Left: Table Section -->
            <div class="flex-1 min-w-0">
               <FlexTable 
                  :columns="earningsTopCountriesColumns" 
                  :rows="currentEarningsInsightData.topCountries" 
                  :theme="earningsTopCountriesTheme"
               >
                  <!-- Custom slot for Rank + Country -->
                  <template #cell.media="{ row }">
                    <div class="flex items-center gap-3 w-full px-3">
                      <div class="w-8 flex justify-start items-center shrink-0">
                        <span class="text-gray-900 text-xs font-semibold">{{ row.rank }}</span>
                      </div>
                      <span class="flex-1 text-gray-900 text-sm font-normal truncate">{{ row.country }}</span>
                    </div>
                  </template>

                  <!-- Custom slot for Sales -->
                  <template #cell.sales="{ value }">
                    <div class="flex justify-end items-center px-3 w-full">
                      <span class="text-gray-900 text-sm font-medium">{{ value }}</span>
                    </div>
                  </template>
               </FlexTable>
            </div>

            <!-- Right: Chart Placeholder -->
            <div class="flex-1 min-w-0 flex flex-col items-center justify-center  p-6 min-h-[300px]">
               <div class="flex flex-col items-center gap-4 text-center">
                  <div class="w-40 h-40 flex justify-center items-center backdrop-blur-[50px] bg-white/20 rounded-full">
                    <img src="https://i.ibb.co.com/Kzh3f1Rr/pie-chart.png" alt="pie-chart" class="w-32 h-32 opacity-40" />
                  </div>
                  <div class="flex flex-col gap-1">
                    <span class="text-gray-500 font-medium">Chart Visualization</span>
                    <span class="text-xs text-gray-400">Detailed breakdown will appear here</span>
                  </div>
               </div>
            </div>
          </div>

          <!-- data-content (Empty State) -->
          <div v-else class="flex flex-col items-start flex-grow flex-shrink [flex-basis: auto] w-full -ml-4 min-w-0 min-h-0">
            <!-- data-content -->
            <div
              class="flex flex-col items-start justify-center flex-grow flex-shrink [flex-basis: auto] w-full gap-4 min-w-0 min-h-0">
              <div
                class="flex flex-col items-center justify-center flex-grow flex-shrink [flex-basis: auto] w-full gap-2 pt-6 pb-6 min-h-[21.25rem] min-w-0">
                <div class="flex items-center justify-center p-4">
                  <div class="relative flex items-center justify-center w-[10.0625rem] h-[10.0625rem]">
                    <img src="https://i.ibb.co.com/vx2RDHM3/svgviewer-png-output-3.webp" alt="list" class="w-32 h-32" />
                  </div>
                </div>

                <div class="flex flex-col items-center gap-2 text-center">
                  <span class="text-base leading-6 text-light-text-secondary dark:text-dark-text-secondary">No trend to
                    show
                    at the moment</span>
                  <a href="#" class="text-base leading-6">
                    <span
                      class="text-base leading-6 text-light-text-secondary dark:text-dark-text-secondary underline">Learn
                      ways to earn</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </TrendPopup>

    <!-- fans popup -->
    <TrendPopup v-model="isFansOpen" v-model:period="fansPeriod" title="Fans Insight" logo="https://i.ibb.co.com/rGSXLKX4/money.webp">
      <div class="flex flex-col gap-4">
        <!-- row -->
        <div class="grid grid-cols-2">
          <div
            class="flex w-full flex-col gap-4 rounded-[0.125rem] border-r border-light-border-primary bg-light-bg-container p-4 text-center backdrop-blur-[25px] dark:border-dark-border-primary dark:bg-dark-bg-container">
            <h3 class="text-light-text-darkgray dark:text-white text-base leading-7 md:text-lg font-semibold">
              New Followers
            </h3>

            <div class="flex flex-col justify-center items-center gap-4">
              <span
                class="text-gray-900 tracking-[-0.045rem] text-3xl leading-[2.375rem] font-semibold md:text-4xl md:leading-[2.75rem]">
                {{ currentFansInsightData.newFollowers ? currentFansInsightData.newFollowers.toLocaleString() : '--' }}
              </span>

              <div class="inline-flex items-center gap-2">
                <div class="w-14 flex justify-center items-center gap-1">
                  <img src="https://i.ibb.co.com/93tZHrmQ/svgviewer-png-output-4.webp" alt="trend-up"
                    class="h-5 w-5" />
                  <div
                    class="text-center text-emerald-700 text-sm font-medium font-['Poppins'] leading-5">
                    20%
                  </div>
                </div>
                <div class=" text-slate-700 text-xs font-normal font-['Poppins'] leading-4">{{ getVsLabel(fansPeriod) }}
                </div>
              </div>
            </div>
          </div>

          <div
            class="flex w-full flex-col gap-4 rounded-[0.125rem] bg-light-bg-container p-4 text-center backdrop-blur-[25px] dark:bg-dark-bg-container">
            <h3 class="text-light-text-darkgray dark:text-white text-base leading-7 md:text-lg font-semibold">
              Total Profile Visit
            </h3>

            <div class="flex flex-col justify-center items-center gap-4">
              <span
                class="text-gray-900 tracking-[-0.045rem] text-3xl leading-[2.375rem] font-semibold md:text-4xl md:leading-[2.75rem]">
                {{ currentFansInsightData.profileVisit ? currentFansInsightData.profileVisit.toLocaleString() : '--' }}
              </span>

              <div class="inline-flex items-center gap-2">
                <div class="w-14 flex justify-center items-center gap-1">
                  <img src="https://i.ibb.co.com/93tZHrmQ/svgviewer-png-output-4.webp" alt="trend-up"
                    class="h-5 w-5" />
                  <div
                    class="text-center text-emerald-700 text-sm font-medium font-['Poppins'] leading-5">
                    20%
                  </div>
                </div>
                <div class=" text-slate-700 text-xs font-normal font-['Poppins'] leading-4">{{ getVsLabel(fansPeriod) }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- row -->
        <div class="flex flex-col md:flex-row gap-4">
          <!-- left-column: Chart Placeholder -->
          <div class="flex flex-col gap-4 p-4 w-full h-[25.875rem] bg-light-bg-container dark:bg-dark-bg-container">
            <div class="flex justify-between items-center gap-2">
              <h3 class="text-light-text-darkgray dark:text-white text-lg font-semibold">
                Traffic Source
              </h3>
            </div>

            <div class="flex flex-col justify-center items-center gap-6 h-full text-center">
              <div class="flex justify-center items-center backdrop-blur-[50px] w-40 h-40 bg-white/20 rounded-full">
                <img src="https://i.ibb.co.com/Kzh3f1Rr/pie-chart.png" alt="pie-chart" class="w-32 h-32 opacity-40" />
              </div>

              <div class="flex flex-col gap-1">
                <span class="text-gray-500 font-medium">Chart Visualization</span>
                <span class="text-xs text-gray-400">Detailed source breakdown will appear here</span>
              </div>
            </div>
          </div>

          <!-- right-column: Top Countries Table -->
          <div class="flex flex-col gap-4 p-4 w-full h-[25.875rem] bg-light-bg-container dark:bg-dark-bg-container overflow-hidden">
            <div class="flex justify-between items-center gap-2">
              <h3 class="text-light-text-darkgray dark:text-white text-lg font-semibold">
                Top Countries
              </h3>
            </div>

            <div v-if="currentFansInsightData?.topCountries?.length > 0" class="w-full h-full overflow-hidden">
               <FlexTable 
                  :columns="fansTopCountriesColumns" 
                  :rows="currentFansInsightData.topCountries" 
                  :theme="earningsTopCountriesTheme"
               >
                  <!-- Custom slot for Rank + Country -->
                  <template #cell.media="{ row }">
                    <div class="flex items-center gap-3 w-full px-3">
                      <div class="w-8 h-8 rounded-sm bg-black flex justify-center items-center shrink-0">
                        <span class="text-white text-xs font-semibold">{{ row.rank }}</span>
                      </div>
                      <span class="flex-1 text-gray-900 text-sm font-normal truncate">{{ row.country }}</span>
                    </div>
                  </template>

                  <!-- Custom slot for Profile Visits -->
                  <template #cell.visits="{ value }">
                    <div class="flex justify-end items-center px-3 w-full">
                      <span class="text-gray-900 text-sm font-medium">{{ value }}</span>
                    </div>
                  </template>
               </FlexTable>
            </div>

            <div v-else class="flex flex-col justify-center items-center gap-6 h-full">
              <div class="flex justify-center items-center backdrop-blur-[50px] w-40 h-40">
                <img src="https://i.ibb.co.com/Kzh3f1Rr/pie-chart.png" alt="pie-chart" class="w-32 h-32" />
              </div>

              <div class="flex flex-col items-center gap-2 text-center">
                <span class="text-base leading-6 text-light-text-secondary dark:text-dark-text-secondary">No trend to
                  show
                  at the moment</span>
                <a href="#" class="text-base leading-6">
                  <span
                    class="text-base leading-6 text-light-text-secondary dark:text-dark-text-secondary underline">Learn
                    ways to earn</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TrendPopup>

    <!-- contributors popup -->
    <TrendPopup v-model="isContributorsOpen" title="Contributors Insight"
      logo="https://i.ibb.co.com/rGSXLKX4/money.webp">
      <div class="flex flex-col gap-4">
        <!-- row -->
        <div
          class="flex flex-col gap-4 p-4 rounded-sm bg-light-bg-container backdrop-blur-[25px] dark:bg-dark-bg-container">
          <h3 class="text-light-text-darkgray dark:text-white text-lg font-semibold">
            Top Contributors
          </h3>

          <!-- data-content -->
          <div class="flex flex-col items-start flex-grow flex-shrink [flex-basis: auto] w-full -ml-4 min-w-0 min-h-0">
            <!-- data-content -->
            <div
              class="flex flex-col items-start justify-center flex-grow flex-shrink [flex-basis: auto] w-full gap-4 min-w-0 min-h-0">
              <div
                class="flex flex-col items-center justify-center flex-grow flex-shrink [flex-basis: auto] w-full gap-2 pt-6 pb-6 min-h-[21.25rem] min-w-0">
                <div class="flex items-center justify-center p-4">
                  <div class="relative flex items-center justify-center w-[10.0625rem] h-[10.0625rem]">
                    <img src="https://i.ibb.co.com/vx2RDHM3/svgviewer-png-output-3.webp" alt="list" class="w-32 h-32" />
                  </div>
                </div>

                <div class="flex flex-col items-center gap-2 text-center">
                  <span class="text-base leading-6 text-light-text-secondary dark:text-dark-text-secondary">No trend to
                    show
                    at the moment</span>
                  <a href="#" class="text-base leading-6">
                    <span
                      class="text-base leading-6 text-light-text-secondary dark:text-dark-text-secondary underline">Learn
                      ways to earn</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- row -->
        <div
          class="flex flex-col gap-4 p-4 rounded-sm bg-light-bg-container backdrop-blur-[25px] dark:bg-dark-bg-container">
          <h3 class="text-light-text-darkgray dark:text-white text-lg font-semibold">
            Top Fans
          </h3>

          <!-- data-content -->
          <div
            class="flex flex-col items-start flex-grow flex-shrink [flex-basis: auto] self-stretch -ml-4 min-w-0 min-h-0">
            <!-- data-content -->
            <div
              class="flex flex-col items-start justify-center flex-grow flex-shrink [flex-basis: auto] w-full gap-4 min-w-0 min-h-0">
              <div
                class="flex flex-col items-center justify-center flex-grow flex-shrink [flex-basis: auto] w-full gap-2 pt-6 pb-6 min-h-[21.25rem] min-w-0">
                <div class="flex items-center justify-center p-4">
                  <div class="relative flex items-center justify-center w-[10.0625rem] h-[10.0625rem]">
                    <img src="https://i.ibb.co.com/vx2RDHM3/svgviewer-png-output-3.webp" alt="list" class="w-32 h-32" />
                  </div>
                </div>

                <div class="flex flex-col items-center gap-2 text-center">
                  <span class="text-base leading-6 text-light-text-secondary dark:text-dark-text-secondary">No trend to
                    show
                    at the moment</span>
                  <a href="#" class="text-base leading-6">
                    <span
                      class="text-base leading-6 text-light-text-secondary dark:text-dark-text-secondary underline">Learn
                      ways to earn</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- row -->
        <div
          class="flex flex-col gap-4 p-4 rounded-sm bg-light-bg-container backdrop-blur-[25px] dark:bg-dark-bg-container">
          <h3 class="text-light-text-darkgray dark:text-white text-lg font-semibold">
            Top Order Spenders
          </h3>

          <!-- data-content -->
          <div
            class="flex flex-col items-start flex-grow flex-shrink [flex-basis: auto] self-stretch -ml-4 min-w-0 min-h-0">
            <!-- data-content -->
            <div
              class="flex flex-col items-start justify-center flex-grow flex-shrink [flex-basis: auto] w-full gap-4 min-w-0 min-h-0">
              <div
                class="flex flex-col items-center justify-center flex-grow flex-shrink [flex-basis: auto] w-full gap-2 pt-6 pb-6 min-h-[21.25rem] min-w-0">
                <div class="flex items-center justify-center p-4">
                  <div class="relative flex items-center justify-center w-[10.0625rem] h-[10.0625rem]">
                    <img src="https://i.ibb.co.com/vx2RDHM3/svgviewer-png-output-3.webp" alt="list" class="w-32 h-32" />
                  </div>
                </div>

                <div class="flex flex-col items-center gap-2 text-center">
                  <span class="text-base leading-6 text-light-text-secondary dark:text-dark-text-secondary">No trend to
                    show
                    at the moment</span>
                  <a href="#" class="text-base leading-6">
                    <span
                      class="text-base leading-6 text-light-text-secondary dark:text-dark-text-secondary underline">Learn
                      ways to earn</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TrendPopup>
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
import FlexTable from '@/components/ui/FlexTable.vue'

const store = useDashboardAnalytics()
const { lastUpdated } = storeToRefs(store)

// --- Contributors Table Data ---
const contributorsColumns = [
  { key: 'fan', label: 'Fan', grow: true, align: 'left' },
  { key: 'total', label: 'Total (USD)', basis: 'basis-32', align: 'right' }
]

const contributorsRows = [
  { id: 1, rank: 1, name: 'MAN GOES', handle: '@Mangoes4eva', avatar: '/images/mangoes.png', total: 'USD$ 9.99' },
  { id: 2, rank: 2, name: 'MAN GOES', handle: '@Mangoes4eva', avatar: '/images/mangoes.png', total: 'USD$ 9.99' },
  { id: 3, rank: 3, name: 'MAN GOES', handle: '@Mangoes4eva', avatar: '/images/mangoes.png', total: 'USD$ 9.99' },
  { id: 4, rank: 4, name: 'MAN GOES', handle: '@Mangoes4eva', avatar: '/images/mangoes.png', total: 'USD$ 9.99' },
  { id: 5, rank: 5, name: 'MAN GOES', handle: '@Mangoes4eva', avatar: '/images/mangoes.png', total: 'USD$ 1000.99' }
]

const contributorsTheme = {
  container: 'relative bg-transparent border-none w-full min-w-72 ',
  header: 'bg-transparent text-gray-500',
  headerRow: 'flex items-center',
  headerCell: 'px-4 py-2.5 text-sm font-normal border-b border-gray-500',
  row: 'flex items-center min-h-16 odd:bg-transparent even:bg-[#F2F4F780]  hover:bg-gray-100/30',
  cell: 'py-2 flex items-center h-full',
  footer: 'hidden'
}

// --- Orders Table Data ---
const ordersColumns = [
  { key: 'order', label: 'Order#', basis: { default: 'grow md:grow-0 md:basis-[300px]' }, align: 'left' },
  { key: 'from', label: 'From', basis: 'basis-[220px]', align: 'left', hiddenAt: ['xs', 'sm'] },
  { key: 'date', label: 'Date', basis: 'basis-[180px]', align: 'left', hiddenAt: ['xs', 'sm'] },
  { key: 'total', label: 'Total', basis: { default: 'ml-auto basis-[80px]' }, align: 'right' },
  { key: 'details', label: '', basis: { default: 'shrink-0 basis-[80px]' }, align: 'right', hiddenAt: ['xs', 'sm'] }
]

const ordersRows = ref([
  { id: 1, tier: 'Tier 1 Subscription', orderId: '#123456', handle: '@Mangoes4eva', date: '22 Jan 2022', total: 'USD$ 9.99' },
  { id: 2, tier: 'Tier 2 Subscription', orderId: '#123456', handle: '@Mangoes4eva', date: '22 Jan 2022', total: 'USD$ 9.99' },
  { id: 3, tier: 'Tier 3 Subscription', orderId: '#123456', handle: '@Mangoes4eva', date: '22 Jan 2022', total: 'USD$ 9.99' },
  { id: 4, tier: 'Tier 4 Subscription', orderId: '#123456', handle: '@Mangoes4eva', date: '22 Jan 2022', total: 'USD$ 9.99' },
  { id: 5, tier: 'Tier 5 Subscription', orderId: '#123456', handle: '@Mangoes4eva', date: '22 Jan 2022', total: 'USD$ 9.99' }
])

const p2vOrdersRows = ref([
  { id: 1, title: 'Record breaking fried chicken eating ! See my attempt to break world’s record! Watch now!', orderId: '#123456', handle: '@Mangoes4eva', date: '22 Jan 2022', total: 'USD$ 9.99' },
  { id: 2, title: 'Record breaking fried chicken eating ! See my attempt to break world’s record! Watch now!', orderId: '#123456', handle: '@Mangoes4eva', date: '22 Jan 2022', total: 'USD$ 9.99' },
  { id: 3, title: 'Record breaking fried chicken eating ! See my attempt to break world’s record! Watch now!', orderId: '#123456', handle: '@Mangoes4eva', date: '22 Jan 2022', total: 'USD$ 9.99' },
  { id: 4, title: 'Record breaking fried chicken eating ! See my attempt to break world’s record! Watch now!', orderId: '#123456', handle: '@Mangoes4eva', date: '22 Jan 2022', total: 'USD$ 9.99' },
  { id: 5, title: 'Record breaking fried chicken eating ! See my attempt to break world’s record! Watch now!', orderId: '#123456', handle: '@Mangoes4eva', date: '22 Jan 2022', total: 'USD$ 9.99' }
])

const merchOrdersColumns = [
  { key: 'order', label: 'Order#', basis: { default: 'grow md:grow-0 md:basis-[280px]' }, align: 'left' },
  { key: 'from', label: 'From', basis: 'basis-[180px]', align: 'left', hiddenAt: ['xs', 'sm'] },
  { key: 'status', label: 'Status', basis: 'basis-[160px]', align: 'left', hiddenAt: ['xs', 'sm'] },
  { key: 'date', label: 'Date', basis: 'basis-[150px]', align: 'left', hiddenAt: ['xs', 'sm'] },
  { key: 'total', label: 'Total', basis: { default: 'ml-auto basis-[80px]' }, align: 'right' },
  { key: 'details', label: '', basis: { default: 'shrink-0 basis-[80px]' }, align: 'right', hiddenAt: ['xs', 'sm'] }
]

const merchOrdersRows = ref([
  { id: 1, type: 'Merch', orderId: '#123456', handle: '@Mangoes4eva', status: 'New', date: '22 Jan 2022', total: 'USD$ 9.99', bg: 'bg-black', innerBg: 'bg-green-500' },
  { id: 2, type: 'Merch', orderId: '#123456', handle: '@Mangoes4eva', status: 'New', date: '22 Jan 2022', total: 'USD$ 9.99', bg: 'bg-black', innerBg: 'bg-green-500' },
  { id: 3, type: 'Mixed', orderId: '#123456', handle: '@Mangoes4eva', status: 'New', date: '22 Jan 2022', total: 'USD$ 9.99', bg: 'bg-green-500', innerBg: 'outline-black outline-2' },
  { id: 4, type: 'Mixed', orderId: '#123456', handle: '@Mangoes4eva', status: 'New', date: '22 Jan 2022', total: 'USD$ 9.99', bg: 'bg-green-500', innerBg: 'outline-black outline-2' },
  { id: 5, type: 'Mixed', orderId: '#123456', handle: '@Mangoes4eva', status: 'New', date: '22 Jan 2022', total: 'USD$ 9.99', bg: 'bg-black', innerBg: 'bg-green-500' }
])

const customRequestOrdersColumns = merchOrdersColumns

const customRequestOrdersRows = ref([
  { id: 1, type: 'Kinks', orderId: '#123456', handle: '@Mangoes4eva', status: 'New', date: '22 Jan 2022', total: 'USD$ 9.99', bg: 'bg-black' },
  { id: 2, type: 'Kinks', orderId: '#123456', handle: '@Mangoes4eva', status: 'New', date: '22 Jan 2022', total: 'USD$ 9.99', bg: 'bg-black' },
  { id: 3, type: 'Clips', orderId: '#123456', handle: '@Mangoes4eva', status: 'New', date: '22 Jan 2022', total: 'USD$ 9.99', bg: 'bg-green-500' },
  { id: 4, type: 'Clips', orderId: '#123456', handle: '@Mangoes4eva', status: 'New', date: '22 Jan 2022', total: 'USD$ 9.99', bg: 'bg-green-500' },
  { id: 5, type: 'Clips', orderId: '#123456', handle: '@Mangoes4eva', status: 'New', date: '22 Jan 2022', total: 'USD$ 9.99', bg: 'bg-black' }
])

const wishtenderOrdersRows = ref([
  { id: 1, title: 'Shure MV7 USB Microphone with Tripod, for Podcasting, Recording, Streaming & Gaming, Built-in Headphone Output, All Metal USB/XLR Dynamic Mic, Voice-Isolating Technology, TeamSpeak Certified - Black', orderId: '#123456', handle: '@Mangoes4eva', date: '22 Jan 2022', total: 'USD$ 9.99' },
  { id: 2, title: 'Shure MV7 USB Microphone with Tripod, for Podcasting, Recording, Streaming & Gaming, Built-in Headphone Output, All Metal USB/XLR Dynamic Mic, Voice-Isolating Technology, TeamSpeak Certified - Black', orderId: '#123456', handle: '@Mangoes4eva', date: '22 Jan 2022', total: 'USD$ 9.99' },
  { id: 3, title: 'Shure MV7 USB Microphone with Tripod, for Podcasting, Recording, Streaming & Gaming, Built-in Headphone Output, All Metal USB/XLR Dynamic Mic, Voice-Isolating Technology, TeamSpeak Certified - Black', orderId: '#123456', handle: '@Mangoes4eva', date: '22 Jan 2022', total: 'USD$ 9.99' },
  { id: 4, title: 'Shure MV7 USB Microphone with Tripod, for Podcasting, Recording, Streaming & Gaming, Built-in Headphone Output, All Metal USB/XLR Dynamic Mic, Voice-Isolating Technology, TeamSpeak Certified - Black', orderId: '#123456', handle: '@Mangoes4eva', date: '22 Jan 2022', total: 'USD$ 9.99' },
  { id: 5, title: 'Shure MV7 USB Microphone with Tripod, for Podcasting, Recording, Streaming & Gaming, Built-in Headphone Output, All Metal USB/XLR Dynamic Mic, Voice-Isolating Technology, TeamSpeak Certified - Black', orderId: '#123456', handle: '@Mangoes4eva', date: '22 Jan 2022', total: 'USD$ 9.99' }
])

const currentRows = computed(() => {
  switch (selectedTab.value) {
    case 'Merch': return merchOrdersRows.value
    case 'Pay to View': return p2vOrdersRows.value
    case 'Custom Request': return customRequestOrdersRows.value
    case 'Wishtender': return wishtenderOrdersRows.value
    default: return ordersRows.value
  }
})

const currentColumns = computed(() => {
  if (selectedTab.value === 'Merch' || selectedTab.value === 'Custom Request') {
    return merchOrdersColumns
  }
  return ordersColumns
})

const ordersTheme = {
  container: 'relative bg-transparent border-none w-full overflow-x-auto ',
  header: 'text-[#667085]',
  headerRow: 'flex items-center h-12',
  headerCell: 'px-4 text-[13px] font-normal tracking-tight',
  row: 'relative group/row flex items-center h-20 odd:bg-transparent even:bg-[#F2F4F780] transition-all',
  cell: 'flex items-center h-full',
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

const orderTabs = ['Subscriptions', 'Pay to View', 'Merch', 'Custom Request', 'Wishtender']
const selectedTab = ref('Subscriptions')
const isDropdownOpen = ref(false)

const trendsTabs = ['Yearly', 'Monthly', 'Weekly', 'Daily']
const selectedTrendTab = ref('Daily')
const isTrendDropdownOpen = ref(false)

const subscribersPeriod = ref('yearly')
const earningsPeriod = ref('yearly')
const fansPeriod = ref('yearly')

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
  const tab = earningsPeriod.value.toLowerCase()
  return store.earnings[tab]?.[0] || null
})

const currentSubscribersInsightData = computed(() => {
  const p = subscribersPeriod.value.toLowerCase()
  return store.subscribers[p] || { new: null, recurring: null }
})

const currentFansInsightData = computed(() => {
  const p = fansPeriod.value.toLowerCase()
  return store.fans[p] || { newFollowers: null, profileVisit: null }
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

// --- Top Media Table Configuration ---
const topMediaTabs = ['Views', 'P2V Sales']
const selectedTopMediaTab = ref('Views')
const isTopMediaDropdownOpen = ref(false)

const topMediaColumns = [
  { key: 'media', label: 'Media', basis: 'basis-1/3', grow: true, align: 'left' },
  { key: 'clicks', label: '# of Clicks', basis: 'basis-1/3', grow: true, align: 'center' },
  { key: 'duration', label: 'Watch Duration', basis: 'basis-1/3', grow: true, align: 'right' }
]

const p2vSalesColumns = [
  { key: 'media', label: 'Media', basis: 'basis-1/3', grow: true, align: 'left' },
  { key: 'sales_count', label: '# of Sales', basis: 'basis-1/3', grow: true, align: 'center' },
  { key: 'sales_usd', label: 'Sales(USD)', basis: 'basis-1/3', grow: true, align: 'right' }
]

const topMediaRows = [
  { id: 1, rank: 1, title: 'Record breaking fried chicken eating ! See my attempt to break world’s record! Watch now!', clicks: '1,234', duration: '32h10m', image: '/images/profile-thumbnail.png' },
  { id: 2, rank: 2, title: 'Record breaking fried chicken eating ! See my attempt to break world’s record! Watch now!', clicks: '1,234', duration: '32h10m', image: '/images/profile-thumbnail.png' },
  { id: 3, rank: 3, title: 'Record breaking fried chicken eating ! See my attempt to break world’s record! Watch now!', clicks: '1,234', duration: '32h10m', image: '/images/profile-thumbnail.png' },
  { id: 4, rank: 4, title: 'Record breaking fried chicken eating ! See my attempt to break world’s record! Watch now!', clicks: '1,234', duration: '32h10m', image: '/images/profile-thumbnail.png' },
  { id: 5, rank: 5, title: 'Record breaking fried chicken eating ! See my attempt to break world’s record! Watch now!', clicks: '1,234', duration: '32h10m', image: '/images/profile-thumbnail.png' }
]

const p2vSalesRows = [
  { id: 1, rank: 1, title: 'Record breaking fried chicken eating ! See my attempt to break world’s record! Watch now!', sales_count: '1,234', sales_usd: 'USD$ 5123.45', image: '/images/profile-thumbnail.png' },
  { id: 2, rank: 2, title: 'Record breaking fried chicken eating ! See my attempt to break world’s record! Watch now!', sales_count: '1,234', sales_usd: 'USD$ 4123.45', image: '/images/profile-thumbnail.png' },
  { id: 3, rank: 3, title: 'Record breaking fried chicken eating ! See my attempt to break world’s record! Watch now!', sales_count: '1,234', sales_usd: 'USD$ 3123.45', image: '/images/profile-thumbnail.png' },
  { id: 4, rank: 4, title: 'Record breaking fried chicken eating ! See my attempt to break world’s record! Watch now!', sales_count: '1,234', sales_usd: 'USD$ 2123.45', image: '/images/profile-thumbnail.png' },
  { id: 5, rank: 5, title: 'Record breaking fried chicken eating ! See my attempt to break world’s record! Watch now!', sales_count: '1,234', sales_usd: 'USD$ 1123.45', image: '/images/profile-thumbnail.png' }
]

const topMediaTheme = {
  container: 'relative bg-transparent border-none w-full ',
  header: 'bg-transparent text-gray-500',
  headerRow: 'flex items-center border-b border-gray-500',
  headerCell: 'px-2.5 py-2.5 text-sm font-normal',
  row: 'flex items-center min-h-[6rem] odd:bg-transparent even:bg-gray-100/50 ',
  cell: 'px-2.5 py-2 flex items-center h-full',
  footer: 'hidden'
}

// --- Top Tags Table Configuration ---
const topTagsColumns = [
  { key: 'tag', label: 'Tags', basis: 'basis-1/2', grow: true, align: 'left' },
  { key: 'views', label: '# of views', basis: 'basis-1/2', grow: true, align: 'right' }
]

const topTagsRows = [
  { id: 1, rank: 1, name: 'Big Foot', views: '2,345' },
  { id: 2, rank: 2, name: 'Big hands', views: '2,345' },
  { id: 3, rank: 3, name: 'Big smile', views: '2,345' },
  { id: 4, rank: 4, name: 'Big appetite', views: '2,345' },
  { id: 5, rank: 5, name: 'Big dreams', views: '2,345' },
  { id: 6, rank: 6, name: 'Big dreams', views: '2,345' },
  { id: 7, rank: 7, name: 'Big dreams', views: '2,345' },
  { id: 8, rank: 8, name: 'Big dreams', views: '2,345' },
  { id: 9, rank: 9, name: 'Big dreams', views: '2,345' },
  { id: 10, rank: 10, name: 'Big dreams', views: '2,345' }
]

const topTagsTheme = {
  container: 'relative bg-transparent border-none w-full ',
  header: 'bg-transparent text-gray-500',
  headerRow: 'flex items-center border-b border-gray-500',
  headerCell: 'px-2.5 py-2.5 text-sm font-normal',
  row: 'flex items-center min-h-[3rem] odd:bg-transparent even:bg-gray-100/50  hover:bg-gray-50 transition-colors',
  cell: 'px-2.5 py-2 flex items-center h-full',
  footer: 'hidden'
}

// --- Top Merch Table Configuration ---
const topMerchColumns = [
  { key: 'merch', label: 'Merch', basis: 'basis-1/2', grow: true, align: 'left' },
  { key: 'views', label: '# of views', basis: 'basis-1/4', grow: true, align: 'right' },
  { key: 'sales', label: 'Sales (USD)', basis: 'basis-1/4', grow: true, align: 'right' }
]

const topMerchRows = [
  { id: 1, rank: 1, title: 'Socks (White, Extra Long)', views: '1,234', sales: 'USD$ 1000.99', image: '/images/profile-thumbnail.png' },
  { id: 2, rank: 2, title: 'Socks (White, Long)', views: '1,234', sales: 'USD$ 1000.99', image: '/images/profile-thumbnail.png' },
  { id: 3, rank: 3, title: 'Socks (White, Extra Long)', views: '1,234', sales: 'USD$ 1000.99', image: '/images/profile-thumbnail.png' },
  { id: 4, rank: 4, title: 'Socks (White, Extra Long)', views: '1,234', sales: 'USD$ 1000.99', image: '/images/profile-thumbnail.png' },
  { id: 5, rank: 5, title: 'Socks (White, Extra Long)', views: '1,234', sales: 'USD$ 1000.99', image: '/images/profile-thumbnail.png' }
]

const topMerchTheme = {
  container: 'relative bg-transparent border-none w-full ',
  header: 'bg-transparent text-gray-500',
  headerRow: 'flex items-center border-b border-gray-500 w-full',
  headerCell: 'px-2.5 py-2.5 text-sm font-normal',
  row: 'flex items-center min-h-[6rem] odd:bg-transparent even:bg-gray-100/50 hover:bg-gray-50 transition-colors w-full',
  cell: 'px-2.5 py-2 flex items-center h-full',
  footer: 'hidden'
}

// --- Top Countries Table Configuration ---
const topCountriesColumns = [
  { key: 'tags', label: 'Tags', basis: 'basis-1/2', grow: true, align: 'left' },
  { key: 'sales', label: 'Sales (USD)', basis: 'basis-1/2', grow: true, align: 'right' }
]

const topCountriesRows = [
  { id: 1, rank: 1, country: 'Hong Kong', sales: 'USD$ 512,345.99' },
  { id: 2, rank: 2, country: 'United States of America', sales: 'USD$ 412,345.99' },
  { id: 3, rank: 3, country: 'Singapore', sales: 'USD$ 312,345.99' },
  { id: 4, rank: 4, country: 'Australia', sales: 'USD$ 212,345.99' },
  { id: 5, rank: 5, country: 'Taiwan', sales: 'USD$ 112,345.99' },
  { id: 6, rank: 6, country: 'Hong Kong', sales: 'USD$ 92,345.99' },
  { id: 7, rank: 7, country: 'United States of America', sales: 'USD$ 72,345.99' },
  { id: 8, rank: 8, country: 'Singapore', sales: 'USD$ 52,345.99' },
  { id: 9, rank: 9, country: 'Australia', sales: 'USD$ 42,345.99' },
  { id: 10, rank: 10, country: 'Taiwan', sales: 'USD$ 12,345.99' }
]

const topCountriesTheme = {
  container: 'relative bg-transparent border-none w-full ',
  header: 'bg-transparent text-gray-500',
  headerRow: 'flex items-center border-b border-gray-500 w-full',
  headerCell: 'px-3 py-2.5 text-sm font-normal',
  row: 'flex items-center min-h-[3rem] odd:bg-transparent even:bg-gray-100/50 hover:bg-gray-50 transition-colors w-full',
  cell: 'px-3 py-2 flex items-center h-full',
  footer: 'hidden'
}

async function handleRefresh() {
  await store.loadAnalytics()
}

// when component load so data will be here
onMounted(() => {
  store.loadAnalytics()
})

</script>
