<template>
  <div class="flex flex-col mt-6 gap-6">
    <!-- overview/insight section -->
    <DashboardOrdersPageContentCreator>
      <div>
        <!-- section-header -->
        <div class="flex flex-col items-start justify-between sm:flex-row sm:items-center p-4">
          <!-- title -->
          <div
            class="flex items-center gap-2 flex-grow flex-shrink [flex-basis: auto] min-w-0 min-h-0"
          >
            <span>
              <img
                src="https://i.ibb.co.com/1G8tw4x3/svgviewer-png-output.webp"
                alt="overview/insight"
                class="w-6 h-6"
              />
            </span>
            <h2
              class="m-0 font-medium text-xl font-sans leading-[1.875rem] text-light-text-quaternary dark:text-dark-text-quaternary"
            >
              Overview/Insight
            </h2>
          </div>
          <!-- last-date -->
          <div class="flex items-center gap-4 w-full justify-between sm:justify-end sm:w-auto">
            <span
              class="text-sm font-sans leading-5 text-light-text-quaternary dark:text-dark-text-quaternary"
              >Last updated at
              <span
                class="text-sm font-sans leading-5 text-light-text-quaternary dark:text-dark-text-quaternary"
                >{{ formatTime(lastUpdated) }}</span
              ></span
            >
            <button
              @click="handleRefresh"
              class="group flex items-center justify-center gap-1 pl-[0.9375rem] pr-2 py-1 bg-light-bg-button dark:bg-dark-bg-button [clip-path:polygon(0_0,100%_0,105%_105%,16%_105%)] hover:bg-light-primary dark:hover:bg-dark-primaryHover [outline: none] border-0"
            >
              <span>
                <img
                  src="https://i.ibb.co.com/tPv74nnJ/svgviewer-png-output-1.webp"
                  alt="refresh"
                  class="w-[.875rem] h-[.875rem] group-hover:[filter:brightness(0)_invert(1)]"
                />
              </span>
              <span
                class="text-xs font-sans font-medium leading-[1.125rem] text-light-primary dark:text-dark-primary group-hover:text-white dark:group-hover:text-[#e8e6e3]"
                >Refresh</span
              >
            </button>
          </div>
        </div>

        <!-- row -->
        <div
          class="grid grid-cols-1 gap-4 pt-0 pb-4 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 px-4"
        >
          <!-- left-column -->
          <div class="flex flex-col gap-4">
            <!-- subscribers -->
            <DashboardOrderCard>
              <div
                class="flex flex-col flex-grow flex-shrink [flex-basis: auto] gap-4 min-w-0 min-h-0"
              >
                <!-- hover-overlay -->
                <div
                  class="absolute hidden group-hover/container:flex items-start justify-end w-full h-full top-0 left-0 z-[10000] [box-shadow:0_0_10px_0_rgba(0,_0,_0,_0.25)]"
                >
                  <button
                    @click="openSubscribers"
                    class="group/button flex items-center justify-center gap-1 pl-[0.9375rem] pr-2 py-1 bg-light-bg-button dark:bg-dark-bg-button [clip-path:polygon(0_0,100%_0,105%_105%,16%_105%)] hover/container:bg-light-primary dark:hover/container:bg-dark-primaryHover"
                  >
                    <span
                      class="text-xs font-sans font-medium leading-[1.125rem] text-light-primary dark:text-dark-primary group-hover/button:text-white dark:group-hover/button:text-[#e8e6e3]"
                      >Trend</span
                    >
                    <span>
                      <img
                        src="https://i.ibb.co.com/7dh1cRfK/svgviewer-png-output-2.webp"
                        alt="expand"
                        class="w-[.875rem] h-[.875rem] group-hover/button:[filter:brightness(0)_invert(1)]"
                      />
                    </span>
                  </button>
                </div>

                <!-- title -->
                <div class="flex items-center gap-2">
                  <h3
                    class="m-0 font-sans font-medium text-base leading-6 text-light-text-secondary dark:text-dark-text-secondary"
                  >
                    Subscribers
                  </h3>
                </div>

                <!-- data-content (new) -->
                <div
                  class="flex flex-col flex-grow flex-shrink [flex-basis: auto] justify-center items-start gap-4 min-w-0 min-h-0"
                >
                  <div
                    class="flex items-center gap-6 w-full flex-grow flex-shrink [flex-basis: auto] min-w-0 min-h-0"
                  >
                    <div
                      class="flex flex-col gap-2 w-full flex-grow flex-shrink [flex-basis: auto] min-w-0 min-h-0"
                    >
                      <div class="relative">
                        <span
                          class="text-xs font-sans font-medium leading-[1.125rem] text-light-text-tertiary dark:text-dark-text-tertiary"
                          >New</span
                        >
                      </div>

                      <div class="flex justify-between">
                        <span>
                          <span
                            class="text-[2.25rem] font-sans font-semibold leading-[2.75rem] tracking-[-0.045rem] text-light-text-primary dark:text-dark-text-primary"
                            >{{ store.subscribers?.new ?? '--' }}</span
                          >
                        </span>

                        <!-- right part only show when data are here -->
                        <div
                          v-if="
                            store.subscribers?.newPercentage !== undefined &&
                            store.subscribers?.newPercentage !== null
                          "
                          class="flex flex-col items-center gap-1"
                        >
                          <span class="flex gap-1">
                            <img
                              src="https://i.ibb.co.com/93tZHrmQ/svgviewer-png-output-4.webp"
                              alt="trend-up"
                              class="h-5 w-5"
                            />
                            <span
                              class="text-light-text-trendGreen dark:text-light-text-trendGreen leading-5 text-sm font-medium"
                              >{{ store.subscribers?.newPercentage }}%</span
                            >
                          </span>
                          <span
                            class="-ml-4 text-light-text-secondary dark:text-dark-text-secondary leading-[1.125rem] text-xs"
                            >vs yesterday</span
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- data-content (recurring) -->
                <div
                  class="flex flex-col flex-grow flex-shrink [flex-basis: auto] justify-center items-start gap-4 min-w-0 min-h-0"
                >
                  <div
                    class="flex items-center gap-6 w-full flex-grow flex-shrink [flex-basis: auto] min-w-0 min-h-0"
                  >
                    <div
                      class="flex flex-col gap-2 w-full flex-grow flex-shrink [flex-basis: auto] min-w-0 min-h-0"
                    >
                      <div class="relative">
                        <span
                          class="text-xs font-sans font-medium leading-[1.125rem] text-light-text-tertiary dark:text-dark-text-tertiary"
                          >RECURRING</span
                        >
                      </div>

                      <div class="flex justify-between">
                        <span>
                          <span
                            class="text-[2.25rem] font-sans font-semibold leading-[2.75rem] tracking-[-0.045rem] text-light-text-primary dark:text-dark-text-primary"
                            >{{ store.subscribers?.recurring }}</span
                          >
                        </span>
                        <!-- right part only show when data are here -->
                        <div
                          v-if="
                            store.subscribers?.recurringPercentage !== undefined &&
                            store.subscribers?.recurringPercentage !== null
                          "
                          class="flex flex-col items-center gap-1"
                        >
                          <span class="flex gap-1">
                            <img
                              src="https://i.ibb.co.com/93tZHrmQ/svgviewer-png-output-4.webp"
                              alt="trend-up"
                              class="h-5 w-5"
                            />
                            <span
                              class="text-light-text-trendGreen dark:text-light-text-trendGreen leading-5 text-sm font-medium"
                              >{{ store.subscribers?.recurringPercentage }}%</span
                            >
                          </span>
                          <span
                            class="-ml-4 text-light-text-secondary dark:text-dark-text-secondary leading-[1.125rem] text-xs"
                            >vs yesterday</span
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </DashboardOrderCard>

            <!-- fans-->
            <DashboardOrderCard>
              <div
                class="flex flex-col flex-grow flex-shrink [flex-basis: auto] gap-4 min-w-0 min-h-0"
              >
                <!-- hover-overlay -->
                <div
                  class="absolute hidden group-hover/container:flex items-start justify-end w-full h-full top-0 left-0 z-[10000] [box-shadow:0_0_10px_0_rgba(0,_0,_0,_0.25)]"
                >
                  <button
                    @click="openFans"
                    class="group/button flex items-center justify-center gap-1 pl-[0.9375rem] pr-2 py-1 bg-light-bg-button dark:bg-dark-bg-button [clip-path:polygon(0_0,100%_0,105%_105%,16%_105%)] hover/container:bg-light-primary dark:hover/container:bg-dark-primaryHover"
                  >
                    <span
                      class="text-xs font-sans font-medium leading-[1.125rem] text-light-primary dark:text-dark-primary group-hover/button:text-white dark:group-hover/button:text-[#e8e6e3]"
                      >Trend</span
                    >
                    <span>
                      <img
                        src="https://i.ibb.co.com/7dh1cRfK/svgviewer-png-output-2.webp"
                        alt="expand"
                        class="w-[.875rem] h-[.875rem] group-hover/button:[filter:brightness(0)_invert(1)]"
                      />
                    </span>
                  </button>
                </div>

                <!-- title -->
                <div class="flex items-center gap-2">
                  <h3
                    class="m-0 font-medium font-sans text-base leading-6 text-light-text-secondary dark:text-dark-text-secondary"
                  >
                    Fans
                  </h3>
                </div>

                <!-- data-content (new followers - profile visit) -->
                <div
                  class="flex flex-col flex-grow flex-shrink [flex-basis: auto] justify-center items-start gap-4 min-w-0 min-h-0"
                >
                  <div
                    class="flex items-center gap-6 w-full flex-grow flex-shrink [flex-basis: auto] min-w-0 min-h-0"
                  >
                    <div class="flex flex-col gap-2 w-full flex-shrink items-start">
                      <span
                        class="text-xs font-medium font-sans leading-[1.125rem] whitespace-nowrap text-light-text-tertiary dark:text-dark-text-tertiary"
                        >NEW FOLLOWERS</span
                      >

                      <div class="flex items-end justify-between w-full gap-1">
                        <span
                          class="text-[1.875rem] font-sans font-semibold leading-[2.375rem] text-light-text-primary dark:text-dark-text-primary"
                        >
                          {{ store.fans?.newFollowers }}</span
                        >
                        <div
                          v-if="
                            store.fans?.newFollowersPercentage !== undefined &&
                            store.fans?.newFollowersPercentage !== null
                          "
                          class="flex flex-col items-center gap-1"
                        >
                          <span class="flex gap-1">
                            <img
                              src="https://i.ibb.co.com/sdvYZGVp/svgviewer-png-output-5.webp"
                              alt="trend-down"
                              class="h-5 w-5"
                            />
                            <span
                              class="text-light-text-trendRed dark:text-light-text-trendRed leading-5 text-sm font-medium"
                              >{{ store.fans?.newFollowersPercentage }}%</span
                            >
                          </span>
                          <span
                            class="-ml-4 text-light-text-secondary dark:text-dark-text-secondary leading-[1.125rem] text-xs"
                            >vs yesterday</span
                          >
                        </div>
                      </div>
                    </div>

                    <div class="flex flex-col gap-2 w-full flex-shrink items-start">
                      <span
                        class="text-xs font-medium font-sans leading-[1.125rem] whitespace-nowrap text-light-text-tertiary dark:text-dark-text-tertiary"
                        >PROFILE VISIT</span
                      >

                      <div class="flex items-end justify-between w-full gap-1">
                        <span
                          class="text-[1.875rem] font-semibold font-sans leading-[2.375rem] text-light-text-primary dark:text-dark-text-primary"
                        >
                          {{ store.fans?.profileVisit ?? '--' }}</span
                        >
                        <div
                          v-if="
                            store.fans?.profileVisitPercentage !== undefined &&
                            store.fans?.profileVisitPercentage !== null
                          "
                          class="flex flex-col items-center gap-1"
                        >
                          <span class="flex gap-1">
                            <img
                              src="https://i.ibb.co.com/sdvYZGVp/svgviewer-png-output-5.webp"
                              alt="trend-down"
                              class="h-5 w-5"
                            />
                            <span
                              class="text-light-text-trendRed dark:text-light-text-trendRed leading-5 text-sm font-medium"
                              >{{ store.fans?.profileVisitPercentage }}%</span
                            >
                          </span>
                          <span
                            class="-ml-4 text-light-text-secondary dark:text-dark-text-secondary leading-[1.125rem] text-xs"
                            >vs yesterday</span
                          >
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
              <div
                class="flex flex-col flex-grow flex-shrink [flex-basis: auto] gap-4 min-w-0 min-h-0"
              >
                <!-- hover-overlay -->
                <div
                  class="absolute hidden group-hover/container:flex items-start justify-end w-full h-full top-0 left-0 z-[10000] [box-shadow:0_0_10px_0_rgba(0,_0,_0,_0.25)]"
                >
                  <button
                    @click="openEarnings"
                    class="group/button flex items-center justify-center gap-1 pl-[0.9375rem] pr-2 py-1 bg-light-bg-button dark:bg-dark-bg-button [clip-path:polygon(0_0,100%_0,105%_105%,16%_105%)] hover/container:bg-light-primary dark:hover/container:bg-dark-primaryHover"
                  >
                    <span
                      class="text-xs font-medium leading-[1.125rem] font-sans text-light-primary dark:text-dark-primary group-hover/button:text-white dark:group-hover/button:text-[#e8e6e3]"
                      >Trend</span
                    >
                    <span>
                      <img
                        src="https://i.ibb.co.com/7dh1cRfK/svgviewer-png-output-2.webp"
                        alt="expand"
                        class="w-[.875rem] h-[.875rem] group-hover/button:[filter:brightness(0)_invert(1)]"
                      />
                    </span>
                  </button>
                </div>

                <!-- title -->
                <div class="flex items-center gap-2">
                  <h3
                    class="m-0 font-medium text-base leading-6 font-sans text-light-text-secondary dark:text-dark-text-secondary"
                  >
                    Earnings
                  </h3>
                </div>

                <div class="flex justify-between">
                  <span>
                    <span
                      class="text-[2.25rem] font-semibold leading-[2.75rem] font-sans tracking-[-0.045rem] text-light-text-primary dark:text-dark-text-primary"
                      >{{ store.earnings?.daily?.[0]?.total ?? '--' }}</span
                    >
                  </span>
                  <div
                    v-if="
                      store.earnings?.daily?.[0]?.earningsPercentage !== undefined &&
                      store.earnings?.daily?.[0]?.earningsPercentage !== null
                    "
                    class="flex flex-col items-center gap-1"
                  >
                    <span class="flex gap-1">
                      <img
                        src="https://i.ibb.co.com/93tZHrmQ/svgviewer-png-output-4.webp"
                        alt="trend-up"
                        class="h-5 w-5"
                      />
                      <span
                        class="text-light-text-trendGreen dark:text-light-text-trendGreen leading-5 text-sm font-medium"
                        >{{ store.earnings?.daily?.[0]?.earningsPercentage }}%</span
                      >
                    </span>
                    <span
                      class="-ml-4 text-light-text-secondary dark:text-dark-text-secondary leading-[1.125rem] text-xs"
                      >vs yesterday</span
                    >
                  </div>
                </div>
              </div>
            </DashboardOrderCard>

            <!-- likes -->
            <DashboardOrderCard
              class="group relative flex flex-col flex-grow flex-shrink [flex-basis: auto] gap-4 p-4 rounded-sm min-w-0 min-h-0 [backdrop-filter:blur(25px)] bg-light-bg-container dark:bg-dark-bg-container"
            >
              <div
                class="flex flex-col flex-grow flex-shrink [flex-basis: auto] gap-4 min-w-0 min-h-0"
              >
                <!-- hover-overlay -->
                <div
                  class="absolute hidden group-hover/container:flex items-start justify-end w-full h-full top-0 left-0 z-[10000] [box-shadow:0_0_10px_0_rgba(0,_0,_0,_0.25)]"
                >
                  <button
                    @click="openLikes"
                    class="group/button flex items-center justify-center gap-1 pl-[0.9375rem] pr-2 py-1 bg-light-bg-button dark:bg-dark-bg-button [clip-path:polygon(0_0,100%_0,105%_105%,16%_105%)] hover/container:bg-light-primary dark:hover/container:bg-dark-primaryHover"
                  >
                    <span
                      class="text-xs font-medium leading-[1.125rem] font-sans text-light-primary dark:text-dark-primary group-hover/button:text-white dark:group-hover/button:text-[#e8e6e3]"
                      >Trend</span
                    >
                    <span>
                      <img
                        src="https://i.ibb.co.com/7dh1cRfK/svgviewer-png-output-2.webp"
                        alt="expand"
                        class="w-[.875rem] h-[.875rem] group-hover/button:[filter:brightness(0)_invert(1)]"
                      />
                    </span>
                  </button>
                </div>
                <!-- title -->
                <div class="flex items-center gap-2">
                  <h3
                    class="m-0 font-medium font-sans text-base leading-6 text-light-text-secondary dark:text-dark-text-secondary"
                  >
                    Likes
                  </h3>
                </div>

                <!-- data-content (media-merch) -->
                <div
                  class="flex flex-col flex-grow flex-shrink [flex-basis: auto] justify-center items-start gap-4 min-w-0 min-h-0"
                >
                  <div
                    class="flex items-center gap-6 w-full flex-grow flex-shrink [flex-basis: auto] min-w-0 min-h-0"
                  >
                    <div class="flex flex-col gap-2 w-full flex-shrink items-start">
                      <span
                        class="text-xs font-medium font-sans leading-[1.125rem] whitespace-nowrap text-light-text-tertiary dark:text-dark-text-tertiary"
                        >MEDIA</span
                      >

                      <div class="flex items-end justify-between w-full gap-1">
                        <span
                          class="text-[1.875rem] font-sans font-semibold leading-[2.375rem] text-light-text-primary dark:text-dark-text-primary"
                        >
                          {{ store.likes?.media ?? '--' }}</span
                        >
                        <div
                          v-if="
                            store.likes?.mediaPercentage !== undefined &&
                            store.likes?.mediaPercentage !== null
                          "
                          class="flex flex-col items-center gap-1"
                        >
                          <span class="flex gap-1">
                            <span
                              class="text-light-text-primary dark:text-dark-text-primary leading-5 text-sm font-medium"
                              >{{ store.likes?.mediaPercentage }}%</span
                            >
                          </span>
                          <span
                            class="-ml-4 text-light-text-secondary dark:text-dark-text-secondary leading-[1.125rem] text-xs"
                            >vs yesterday</span
                          >
                        </div>
                      </div>
                    </div>

                    <div class="flex flex-col gap-2 w-full flex-shrink items-start">
                      <span
                        class="text-xs font-medium font-sans leading-[1.125rem] whitespace-nowrap text-light-text-tertiary dark:text-dark-text-tertiary"
                        >MERCH</span
                      >

                      <div class="flex items-end justify-between w-full gap-1">
                        <span
                          class="text-[1.875rem] font-sans font-semibold leading-[2.375rem] text-light-text-primary dark:text-dark-text-primary"
                          >{{ store.likes?.merch ?? '--' }}</span
                        >
                        <div
                          v-if="
                            store.likes?.merchPercentage !== undefined &&
                            store.likes?.merchPercentage !== null
                          "
                          class="flex flex-col items-center gap-1"
                        >
                          <span class="flex gap-1">
                            <span
                              class="text-light-text-primary dark:text-dark-text-primary leading-5 text-sm font-medium"
                              >{{ store.likes?.merchPercentage }}%</span
                            >
                          </span>
                          <span
                            class="-ml-4 text-light-text-secondary dark:text-dark-text-secondary leading-[1.125rem] text-xs"
                            >vs yesterday</span
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- data-content (profile-feed) -->
                <div
                  class="flex flex-col flex-grow flex-shrink [flex-basis: auto] justify-center items-start gap-4 min-w-0 min-h-0"
                >
                  <div
                    class="flex items-center gap-6 w-full flex-grow flex-shrink [flex-basis: auto] min-w-0 min-h-0"
                  >
                    <div class="flex flex-col gap-2 w-full flex-shrink items-start">
                      <span
                        class="text-xs font-medium font-sans leading-[1.125rem] whitespace-nowrap text-light-text-tertiary dark:text-dark-text-tertiary"
                        >PROFILE</span
                      >

                      <div class="flex items-end justify-between w-full gap-1">
                        <span
                          class="text-[1.875rem] font-semibold font-sans leading-[2.375rem] text-light-text-primary dark:text-dark-text-primary"
                          >{{ store.likes?.profile ?? '--' }}</span
                        >
                        <div
                          v-if="
                            store.likes?.profilePercentage !== undefined &&
                            store.likes?.profilePercentage !== null
                          "
                          class="flex flex-col items-center gap-1"
                        >
                          <span class="flex gap-1">
                            <span
                              class="text-light-text-primary dark:text-dark-text-primary leading-5 text-sm font-medium"
                              >{{ store.likes?.profilePercentage }}%</span
                            >
                          </span>
                          <span
                            class="-ml-4 text-light-text-secondary dark:text-dark-text-secondary leading-[1.125rem] text-xs"
                            >vs yesterday</span
                          >
                        </div>
                      </div>
                    </div>

                    <div class="flex flex-col gap-2 w-full flex-shrink items-start">
                      <span
                        class="text-xs font-medium leading-[1.125rem] font-sans whitespace-nowrap text-light-text-tertiary dark:text-dark-text-tertiary"
                        >FEED</span
                      >

                      <div class="flex items-end justify-between w-full gap-1">
                        <span
                          class="text-[1.875rem] font-semibold leading-[2.375rem] font-sans text-light-text-primary dark:text-dark-text-primary"
                          >{{ store.likes?.feed ?? '--' }}</span
                        >
                        <div
                          v-if="
                            store.likes?.feedPercentage !== undefined &&
                            store.likes?.feedPercentage !== null
                          "
                          class="flex flex-col items-center gap-1"
                        >
                          <span class="flex gap-1">
                            <span
                              class="text-light-text-primary dark:text-dark-text-primary leading-5 text-sm font-medium"
                              >{{ store.likes?.feedPercentage }}%</span
                            >
                          </span>
                          <span
                            class="-ml-4 text-light-text-secondary dark:text-dark-text-secondary leading-[1.125rem] text-xs"
                            >vs yesterday</span
                          >
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
                  class="absolute hidden group-hover/container:flex items-start justify-end w-full h-full top-0 left-0 z-[10000] [box-shadow:0_0_10px_0_rgba(0,_0,_0,_0.25)]"
                >
                  <button
                    @click="openContributors"
                    class="group/button flex items-center justify-center gap-1 pl-[0.9375rem] pr-2 py-1 bg-light-bg-button dark:bg-dark-bg-button [clip-path:polygon(0_0,100%_0,105%_105%,16%_105%)] hover/container:bg-light-primary dark:hover/container:bg-dark-primaryHover"
                  >
                    <span
                      class="text-xs font-sans font-medium leading-[1.125rem] text-light-primary dark:text-dark-primary group-hover/button:text-white dark:group-hover/button:text-[#e8e6e3]"
                      >Trend</span
                    >
                    <span>
                      <img
                        src="https://i.ibb.co.com/7dh1cRfK/svgviewer-png-output-2.webp"
                        alt="expand"
                        class="w-[.875rem] h-[.875rem] group-hover/button:[filter:brightness(0)_invert(1)]"
                      />
                    </span>
                  </button>
                </div>

                <!-- title -->
                <div class="flex items-center gap-2">
                  <h3
                    class="m-0 font-medium font-sans text-base leading-6 text-light-text-secondary dark:text-dark-text-secondary"
                  >
                    Top Contributors
                  </h3>
                </div>
              </div>

              <!-- empty-state -->
              <div
                class="flex flex-col items-start justify-start flex-grow flex-shrink [flex-basis: auto] gap-4 min-w-0 min-h-0"
              >
                <!-- data-content -->
                <div
                  class="flex flex-col items-start flex-grow flex-shrink [flex-basis: auto] self-stretch -ml-4 min-w-0 min-h-0"
                >
                  <!-- data-content -->
                  <div
                    class="flex flex-col items-start justify-center flex-grow flex-shrink [flex-basis: auto] w-full gap-4 min-w-0 min-h-0"
                  >
                    <div
                      class="flex flex-col items-center justify-center flex-grow flex-shrink [flex-basis: auto] w-full gap-2 pt-6 pb-6 min-h-[21.25rem] min-w-0"
                    >
                      <div class="flex items-center justify-center p-4">
                        <div
                          class="relative flex items-center justify-center w-[10.0625rem] h-[10.0625rem]"
                        >
                          <img
                            src="https://i.ibb.co.com/vx2RDHM3/svgviewer-png-output-3.webp"
                            alt="list"
                            class="w-32 h-32"
                          />
                        </div>
                      </div>

                      <div class="flex flex-col items-center text-center gap-2">
                        <span
                          class="text-base leading-6 font-sans text-light-text-secondary dark:text-dark-text-secondary"
                          >No trend to show at the moment</span
                        >
                        <a href="#" class="text-base leading-6">
                          <span
                            class="text-base leading-6 font-sans text-light-text-secondary dark:text-dark-text-secondary underline"
                            >Learn ways to earn</span
                          >
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </DashboardOrderCard>
          </div>
        </div>
      </div>
    </DashboardOrdersPageContentCreator>

    <!-- Trends Section -->
    <DashboardOrdersPageContentCreator>
      <div class="relative gap-6 flex flex-col">
        <!-- section-header -->
        <div
          class="flex flex-col sm:flex-row px-4 pt-4 pb-0 justify-between items-start md:items-center"
        >
          <!-- title -->
          <div
            class="title flex items-center gap-2 flex-grow flex-shrink basis-auto min-w-0 min-h-0"
          >
            <span>
              <img
                src="https://i.ibb.co.com/wrrYKHLv/svgviewer-png-output-6.webp"
                alt="trends"
                class="w-6 h-6"
              />
            </span>
            <h2
              class="m-0 text-light-text-quaternary font-sans dark:text-dark-text-quaternary text-xl leading-[1.875rem] font-medium"
            >
              Trends
            </h2>
          </div>

          <!-- tabs-button-group -->
          <div class="flex flex-col md:flex-row md:items-center gap-4">
            <!-- last-date -->
            <div class="flex items-center gap-4 w-full justify-between sm:justify-end sm:w-auto">
              <span
                class="text-sm leading-5 font-sans text-light-text-quaternary dark:text-dark-text-quaternary"
                >Last updated at
                <span
                  class="text-sm leading-5 font-sans text-light-text-quaternary dark:text-dark-text-quaternary"
                  >7:14 PM</span
                ></span
              >
              <button
                class="group flex items-center justify-center gap-1 pl-[0.9375rem] pr-2 py-1 bg-light-bg-button dark:bg-dark-bg-button [clip-path:polygon(0_0,100%_0,105%_105%,16%_105%)] hover:bg-light-primary dark:hover:bg-dark-primaryHover [outline: none] border-0"
              >
                <span>
                  <img
                    src="https://i.ibb.co.com/tPv74nnJ/svgviewer-png-output-1.webp"
                    alt="refresh"
                    class="w-[.875rem] h-[.875rem] group-hover:[filter:brightness(0)_invert(1)]"
                  />
                </span>
                <span
                  class="text-xs font-medium font-sans leading-[1.125rem] text-light-primary dark:text-dark-primary group-hover:text-white dark:group-hover:text-[#e8e6e3]"
                  >Refresh</span
                >
              </button>
            </div>

            <!-- tabs -->
            <div
              class="trends-tabs-wrapper hidden md:flex px-1 py-1 rounded-[3rem] bg-gradient-to-r from-[rgba(251,_91,_162,_0.15)] to-[rgba(251,_91,_162,_0.08)] border-none shadow-[0_1px_2px_0_rgba(16,_24,_40,_0.05)] overflow-hidden items-start"
            >
              <button
                class="trends-tabs-wrapper-button font-sans px-4 py-2 text-sm font-medium leading-5 justify-center items-center flex gap-2 outline-none border-none"
              >
                Yearly
              </button>
              <button
                class="trends-tabs-wrapper-button font-sans px-4 py-2 text-sm font-medium leading-5 justify-center items-center flex gap-2 outline-none border-none"
              >
                Monthly
              </button>
              <button
                class="trends-tabs-wrapper-button font-sans px-4 py-2 text-sm font-medium leading-5 justify-center items-center flex gap-2 outline-none border-none"
              >
                Weekly
              </button>
              <button
                class="trends-tabs-wrapper-button font-sans active px-4 py-2 text-sm font-medium leading-5 justify-center items-center flex gap-2 outline-none border-none rounded-[3rem] bg-black text-white"
              >
                Daily
              </button>
            </div>

            <!-- select-dropdown -->
            <div
              class="select-dropdown relative z-[10000] flex md:hidden justify-start sm:justify-end"
              id="select-dropdown"
            >
              <div
                class="trends-select cursor-pointer min-w-[5.75rem] rounded-[0.5rem] border-none bg-white/30 dark:bg-[#181a1b]/30"
              >
                <div
                  class="dash-select__trigger flex items-center justify-center gap-1 rounded-[0.5rem] bg-white/50 px-[0.875rem] py-[0.625rem] dark:bg-[#181a1b]/50"
                >
                  <span
                    class="text-[0.875rem] font-sans font-medium leading-[1.25rem] text-[#0c111d] capitalize tracking-[0.01875rem] text-balance dark:text-[#dbd8d3]"
                    >Yearly</span
                  >
                  <img
                    class="select-arrow h-6 w-6 transition-transform duration-200"
                    src="https://i.ibb.co.com/7dq66KXb/svgviewer-png-output-8.webp"
                    alt="arrow-down"
                  />
                </div>
                <div
                  class="dash-options-container absolute left-auto right-0 top-[calc(100%+0.5rem)] z-[9999] w-full min-w-[15rem] origin-top scale-95 opacity-0 shadow-lg transition-all duration-200 ease-out [transform-origin:50%_0]"
                >
                  <div
                    class="rounded-[0.125rem] border border-[rgba(186,188,203,0.5)] bg-white/90 dark:border-[rgba(61,71,73,0.5)] dark:bg-[#181a1b]/90"
                  >
                    <div
                      class="option flex items-center justify-center gap-[0.625rem] hover:bg-white p-[0.75rem] dark:hover:bg-[#e8e6e3]"
                    >
                      <div
                        class="option-inner-container flex flex-1 gap-[0.625rem] px-[0.625rem] py-[0.563rem]"
                      >
                        <span
                          class="text-[0.875rem] font-sans font-medium leading-[1.25rem] text-[#0c111d] capitalize tracking-[0.01875rem] text-balance dark:text-[#dbd8d3]"
                          >Yearly</span
                        >
                      </div>
                    </div>
                    <div
                      class="option flex items-center justify-center gap-[0.625rem] hover:bg-white p-[0.75rem] dark:hover:bg-[#e8e6e3]"
                    >
                      <div
                        class="option-inner-container flex flex-1 gap-[0.625rem] px-[0.625rem] py-[0.563rem]"
                      >
                        <span
                          class="text-[0.875rem] font-sans font-medium leading-[1.25rem] text-[#0c111d] capitalize tracking-[0.01875rem] text-balance dark:text-[#dbd8d3]"
                          >Monthly</span
                        >
                      </div>
                    </div>
                    <div
                      class="option flex items-center justify-center gap-[0.625rem] hover:bg-white p-[0.75rem] dark:hover:bg-[#e8e6e3]"
                    >
                      <div
                        class="option-inner-container flex flex-1 gap-[0.625rem] px-[0.625rem] py-[0.563rem]"
                      >
                        <span
                          class="text-[0.875rem] font-sans font-medium leading-[1.25rem] text-[#0c111d] capitalize tracking-[0.01875rem] text-balance dark:text-[#dbd8d3]"
                          >Weekly</span
                        >
                      </div>
                    </div>
                    <div
                      class="option flex items-center justify-center gap-[0.625rem] hover:bg-white p-[0.75rem] dark:hover:bg-[#e8e6e3]"
                    >
                      <div
                        class="option-inner-container flex flex-1 gap-[0.625rem] px-[0.625rem] py-[0.563rem]"
                      >
                        <span
                          class="text-[0.875rem] font-sans font-medium leading-[1.25rem] text-[#0c111d] capitalize tracking-[0.01875rem] text-balance dark:text-[#dbd8d3]"
                          >Daily</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <select class="font-sans hidden" name="trends-select" required>
                <option value="yearly">Yearly</option>
                <option value="monthly">Monthly</option>
                <option value="weekly">Weekly</option>
                <option value="daily">Daily</option>
              </select>
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
                <div>
                  <!-- title -->
                  <div class="flex items-center justify-between gap-2">
                    <h3
                      class="text-light-text-secondary font-sans dark:text-dark-text-secondary m-0 leading-6 text-base font-medium"
                    >
                      Top Media
                    </h3>
                    <!-- tabs-button-group -->
                    <div
                      class="trends-tabs-wrapper hidden md:flex px-1 py-1 rounded-[3rem] bg-gradient-to-r from-[rgba(251,_91,_162,_0.15)] to-[rgba(251,_91,_162,_0.08)] border-none shadow-[0_1px_2px_0_rgba(16,_24,_40,_0.05)] overflow-hidden items-start"
                    >
                      <button
                        class="trends-tabs-wrapper-button font-sans active px-4 py-2 text-sm font-medium leading-5 justify-center items-center flex gap-2 outline-none border-none rounded-[3rem] bg-black text-white"
                      >
                        Views
                      </button>
                      <button
                        class="trends-tabs-wrapper-button font-sans px-4 py-2 text-sm font-medium leading-5 justify-center items-center flex gap-2 outline-none border-none"
                      >
                        P2V Sales
                      </button>
                    </div>
                  </div>
                </div>

                <!-- tabs-content -->
                <DashboardTrendContent
                  image="https://i.ibb.co.com/vx2RDHM3/svgviewer-png-output-3.webp"
                  alt="list"
                  message="No trend to show at the moment"
                  link="#"
                  linkText="Learn ways to earn"
                />
              </DashboardTrendCard>
            </div>

            <!-- white-card-column-container (tags) -->
            <div class="second-white-card-column w-full gap-4 order-2 xl:order-1 flex flex-col">
              <!-- white-card -->
              <DashboardTrendCard>
                <!-- tabs-container -->
                <div>
                  <!-- title -->
                  <div class="flex items-center justify-between gap-2">
                    <h3
                      class="text-light-text-secondary font-sans dark:text-dark-text-secondary m-0 leading-6 text-base font-medium"
                    >
                      Top Tags
                    </h3>
                  </div>
                </div>

                <!-- tabs-content -->
                <DashboardTrendContent
                  image="https://i.ibb.co.com/vx2RDHM3/svgviewer-png-output-3.webp"
                  alt="list"
                  message="No trend to show at the moment"
                  link="#"
                  linkText="Learn ways to earn"
                />
              </DashboardTrendCard>
            </div>

            <!-- white-card-column-container (merch) -->
            <div
              class="third-white-card-column col-span-full gap-4 w-full order-1 xl:col-span-2 flex flex-col"
            >
              <!-- white-card -->
              <DashboardTrendCard>
                <!-- tabs-container -->
                <div>
                  <!-- title -->
                  <div class="flex items-center justify-between gap-2">
                    <h3
                      class="text-light-text-secondary font-sans dark:text-dark-text-secondary m-0 leading-6 text-base font-medium"
                    >
                      Top Merch
                    </h3>
                  </div>
                </div>

                <!-- tabs-content -->
                <DashboardTrendContent
                  image="https://i.ibb.co.com/vx2RDHM3/svgviewer-png-output-3.webp"
                  alt="list"
                  message="No trend to show at the moment"
                  link="#"
                  linkText="Learn ways to earn"
                />
              </DashboardTrendCard>
            </div>

            <!-- white-card-column-container (countries) -->
            <div class="fourth-white-card-column w-full gap-4 order-3 flex flex-col">
              <!-- white-card -->
              <DashboardTrendCard>
                <!-- tabs-container -->
                <div>
                  <!-- title -->
                  <div class="flex items-center justify-between gap-2">
                    <h3
                      class="text-light-text-secondary font- dark:text-dark-text-secondary m-0 leading-6 text-base font-medium"
                    >
                      Top Countries
                    </h3>
                  </div>
                </div>

                <!-- tabs-content -->
                <DashboardTrendContent
                  image="https://i.ibb.co.com/vx2RDHM3/svgviewer-png-output-3.webp"
                  alt="list"
                  message="No trend to show at the moment"
                  link="#"
                  linkText="Learn ways to earn"
                />
              </DashboardTrendCard>
            </div>
          </div>
        </div>

        <ChartContainer/>
      </div>
    </DashboardOrdersPageContentCreator>

    <!-- Subscribers popup -->
    <TrendPopup
      v-model="isSubscribersOpen"
      title="Subscriptions Insight"
      logo="https://i.ibb.co.com/MyhfGRNH/svgviewer-png-output-12.webp"
    >
      <!-- row -->
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <!-- left-column -->
        <div class="flex flex-col gap-4 p-4 w-full h-[25.875rem]">
          <h3 class="text-base font-medium leading-6 text-[#0C111D] dark:text-[#dbd8d3]">
            Subscriptions Insight
          </h3>

          <div class="flex flex-col justify-center items-center gap-6 h-full">
            <div class="flex justify-center items-center backdrop-blur-[50px] w-40 h-40">
              <img
                src="https://i.ibb.co.com/Kzh3f1Rr/pie-chart.png"
                alt="pie-chart"
                class="w-32 h-32"
              />
            </div>

            <div class="flex flex-col items-center text-center gap-2">
              <span
                class="text-base leading-6 text-light-text-secondary dark:text-dark-text-secondary"
                >No trend to show at the moment</span
              >
              <a href="#" class="text-base leading-6">
                <span
                  class="text-base leading-6 text-light-text-secondary dark:text-dark-text-secondary underline"
                  >Learn ways to earn</span
                >
              </a>
            </div>
          </div>
        </div>

        <!-- right-column -->
        <div class="flex flex-col gap-4 p-4 w-full h-[25.875rem]">
          <h3 class="text-base font-medium leading-6 text-[#0C111D] dark:text-[#dbd8d3]">
            Tiers Breakdown
          </h3>

          <div class="flex flex-col justify-center items-center gap-6 h-full">
            <div class="flex justify-center items-center backdrop-blur-[50px] w-40 h-40">
              <img
                src="https://i.ibb.co.com/Kzh3f1Rr/pie-chart.png"
                alt="pie-chart"
                class="w-32 h-32"
              />
            </div>

            <div class="flex flex-col items-center text-center gap-2">
              <span
                class="text-base leading-6 text-light-text-secondary dark:text-dark-text-secondary"
                >No trend to show at the moment</span
              >
              <a href="#" class="text-base leading-6">
                <span
                  class="text-base leading-6 text-light-text-secondary dark:text-dark-text-secondary underline"
                  >Learn ways to earn</span
                >
              </a>
            </div>
          </div>
        </div>
      </div>
    </TrendPopup>

    <!-- Earnings popup -->
    <TrendPopup
      v-model="isEarningsOpen"
      title="Earnings Insight"
      logo="https://i.ibb.co.com/rGSXLKX4/money.webp"
    >
     <div class="flex flex-col gap-4">

       <!-- row -->
      <div class="grid grid-cols-2">
        <div
          class="flex w-full flex-col gap-4 rounded-[0.125rem] border-r border-light-border-primary bg-light-bg-container p-4 text-center backdrop-blur-[25px] dark:border-dark-border-primary dark:bg-dark-bg-container"
        >
          <h3
            class="text-light-text-darkgray dark:text-white text-base leading-7 md:text-lg font-semibold"
          >
            Total Earnings
          </h3>

          <div class="flex flex-col justify-center items-center gap-4">
            <span
              class="text-light-text-primary dark:text-dark-text-primary tracking-[-0.045rem] text-3xl leading-[2.375rem] font-semibold md:text-4xl md:leading-[2.75rem]"
              >--</span
            >

            <div class="flex flex-col gap-2 justify-center items-center">
              <span
                class="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary"
                >--</span
              >
              <span
                class="text-xs leading-normal text-light-text-secondary dark:text-dark-text-secondary"
                >vs yesterday</span
              >
            </div>
          </div>
        </div>

        <div
          class="flex w-full flex-col gap-4 rounded-[0.125rem] bg-light-bg-container p-4 text-center backdrop-blur-[25px] dark:bg-dark-bg-container"
        >
          <h3
            class="text-light-text-darkgray dark:text-white text-base leading-7 md:text-lg font-semibold"
          >
            Total Earnings
          </h3>

          <div class="flex flex-col justify-center items-center gap-4">
            <span
              class="text-light-text-primary dark:text-dark-text-primary tracking-[-0.045rem] text-3xl leading-[2.375rem] font-semibold md:text-4xl md:leading-[2.75rem]"
              >--</span
            >

            <div class="flex flex-col gap-2 justify-center items-center">
              <span
                class="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary"
                >--</span
              >
              <span
                class="text-xs leading-normal text-light-text-secondary dark:text-dark-text-secondary"
                >vs yesterday</span
              >
            </div>
          </div>
        </div>
      </div>

      <!-- row -->
      <div class="flex flex-col md:flex-row gap-4">
        <!-- left-column -->
        <div
          class="flex flex-col gap-4 p-4 w-full h-[25.875rem] bg-light-bg-container dark:bg-dark-bg-container"
        >
          <div class="flex justify-between items-center gap-2">
            <h3 class="text-light-text-darkgray dark:text-white text-lg font-semibold">
              Sales Insight
            </h3>
          </div>

          <div class="flex flex-col justify-center items-center gap-6 h-full">
            <div class="flex justify-center items-center backdrop-blur-[50px] w-40 h-40">
              <img
                src="https://i.ibb.co.com/Kzh3f1Rr/pie-chart.png"
                alt="pie-chart"
                class="w-32 h-32"
              />
            </div>

            <div class="flex flex-col items-center gap-2">
              <span
                class="text-base leading-6 text-light-text-secondary dark:text-dark-text-secondary"
                >No trend to show at the moment</span
              >
              <a href="#" class="text-base leading-6">
                <span
                  class="text-base leading-6 text-light-text-secondary dark:text-dark-text-secondary underline"
                  >Learn ways to earn</span
                >
              </a>
            </div>
          </div>
        </div>

        <!-- right-column -->
        <div
          class="flex flex-col gap-4 p-4 w-full h-[25.875rem] bg-light-bg-container dark:bg-dark-bg-container"
        >
          <div class="flex justify-between items-center gap-2">
            <h3 class="text-light-text-darkgray dark:text-white text-lg font-semibold">
              Tokens Trend
            </h3>
          </div>

          <div class="flex flex-col justify-center items-center gap-6 h-full">
            <div class="flex justify-center items-center backdrop-blur-[50px] w-40 h-40">
              <img
                src="https://i.ibb.co.com/Kzh3f1Rr/pie-chart.png"
                alt="pie-chart"
                class="w-32 h-32"
              />
            </div>

            <div class="flex flex-col items-center gap-2">
              <span
                class="text-base leading-6 text-light-text-secondary dark:text-dark-text-secondary"
                >No trend to show at the moment</span
              >
              <a href="#" class="text-base leading-6">
                <span
                  class="text-base leading-6 text-light-text-secondary dark:text-dark-text-secondary underline"
                  >Learn ways to earn</span
                >
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- row -->
      <div
        class="flex flex-col gap-4 p-4 rounded-sm bg-light-bg-container backdrop-blur-[25px] dark:bg-dark-bg-container"
      >
        <h3 class="text-light-text-darkgray dark:text-white text-lg font-semibold">
          Top Countries
        </h3>

        <!-- data-content -->
        <div
          class="flex flex-col items-start flex-grow flex-shrink [flex-basis: auto] self-stretch -ml-4 min-w-0 min-h-0"
        >
          <!-- data-content -->
          <div
            class="flex flex-col items-start justify-center flex-grow flex-shrink [flex-basis: auto] w-full gap-4 min-w-0 min-h-0"
          >
            <div
              class="flex flex-col items-center justify-center flex-grow flex-shrink [flex-basis: auto] w-full gap-2 pt-6 pb-6 min-h-[21.25rem] min-w-0"
            >
              <div class="flex items-center justify-center p-4">
                <div
                  class="relative flex items-center justify-center w-[10.0625rem] h-[10.0625rem]"
                >
                  <img
                    src="https://i.ibb.co.com/vx2RDHM3/svgviewer-png-output-3.webp"
                    alt="list"
                    class="w-32 h-32"
                  />
                </div>
              </div>

              <div class="flex flex-col items-center gap-2 text-center">
                <span
                  class="text-base leading-6 text-light-text-secondary dark:text-dark-text-secondary"
                  >No trend to show at the moment</span
                >
                <a href="#" class="text-base leading-6">
                  <span
                    class="text-base leading-6 text-light-text-secondary dark:text-dark-text-secondary underline"
                    >Learn ways to earn</span
                  >
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
     </div>

    </TrendPopup>

    <!-- fans popup -->
    <TrendPopup
      v-model="isFansOpen"
      title="Fans Insight"
      logo="https://i.ibb.co.com/rGSXLKX4/money.webp"
    >
     <div class="flex flex-col gap-4">
       <!-- row -->
      <div class="grid grid-cols-2">
        <div
          class="flex w-full flex-col gap-4 rounded-[0.125rem] border-r border-light-border-primary bg-light-bg-container p-4 text-center backdrop-blur-[25px] dark:border-dark-border-primary dark:bg-dark-bg-container"
        >
          <h3
            class="text-light-text-darkgray dark:text-white text-base leading-7 md:text-lg font-semibold"
          >
            New Followers
          </h3>

          <!-- <div class="flex flex-col justify-center items-center gap-4">
            <span
              class="text-light-text-primary dark:text-dark-text-primary tracking-[-0.045rem] text-3xl leading-[2.375rem] font-semibold md:text-4xl md:leading-[2.75rem]"
              >--</span
            >

            <div class="flex flex-col gap-2 justify-center items-center">
              <span
                class="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary"
                >--</span
              >
              <span
                class="text-xs leading-normal text-light-text-secondary dark:text-dark-text-secondary"
                >vs yesterday</span
              >
            </div>
          </div> -->
        </div>

        <div
          class="flex w-full flex-col gap-4 rounded-[0.125rem] bg-light-bg-container p-4 text-center backdrop-blur-[25px] dark:bg-dark-bg-container"
        >
          <h3
            class="text-light-text-darkgray dark:text-white text-base leading-7 md:text-lg font-semibold"
          >
           Total Profile Visit
          </h3>

          <div class="flex flex-col justify-center items-center gap-4">
            <span
              class="text-light-text-primary dark:text-dark-text-primary tracking-[-0.045rem] text-3xl leading-[2.375rem] font-semibold md:text-4xl md:leading-[2.75rem]"
              >--</span
            >

            <!-- <div class="flex flex-col gap-2 justify-center items-center">
              <span
                class="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary"
                >--</span
              >
              <span
                class="text-xs leading-normal text-light-text-secondary dark:text-dark-text-secondary"
                >vs yesterday</span
              >
            </div> -->
          </div>
        </div>
      </div>

      <!-- row -->
      <div class="flex flex-col md:flex-row gap-4">
        <!-- left-column -->
        <div
          class="flex flex-col gap-4 p-4 w-full h-[25.875rem] bg-light-bg-container dark:bg-dark-bg-container"
        >
          <div class="flex justify-between items-center gap-2">
            <h3 class="text-light-text-darkgray dark:text-white text-lg font-semibold">
              Traffic Source
            </h3>
          </div>

          <div class="flex flex-col justify-center items-center gap-6 h-full">
            <div class="flex justify-center items-center backdrop-blur-[50px] w-40 h-40">
              <img
                src="https://i.ibb.co.com/Kzh3f1Rr/pie-chart.png"
                alt="pie-chart"
                class="w-32 h-32"
              />
            </div>

            <div class="flex flex-col items-center gap-2">
              <span
                class="text-base leading-6 text-light-text-secondary dark:text-dark-text-secondary"
                >No trend to show at the moment</span
              >
              <a href="#" class="text-base leading-6">
                <span
                  class="text-base leading-6 text-light-text-secondary dark:text-dark-text-secondary underline"
                  >Learn ways to earn</span
                >
              </a>
            </div>
          </div>
        </div>

        <!-- right-column -->
        <div
          class="flex flex-col gap-4 p-4 w-full h-[25.875rem] bg-light-bg-container dark:bg-dark-bg-container"
        >
          <div class="flex justify-between items-center gap-2">
            <h3 class="text-light-text-darkgray dark:text-white text-lg font-semibold">
              Top Countries
            </h3>
          </div>

          <div class="flex flex-col justify-center items-center gap-6 h-full">
            <div class="flex justify-center items-center backdrop-blur-[50px] w-40 h-40">
              <img
                src="https://i.ibb.co.com/Kzh3f1Rr/pie-chart.png"
                alt="pie-chart"
                class="w-32 h-32"
              />
            </div>

            <div class="flex flex-col items-center gap-2">
              <span
                class="text-base leading-6 text-light-text-secondary dark:text-dark-text-secondary"
                >No trend to show at the moment</span
              >
              <a href="#" class="text-base leading-6">
                <span
                  class="text-base leading-6 text-light-text-secondary dark:text-dark-text-secondary underline"
                  >Learn ways to earn</span
                >
              </a>
            </div>
          </div>
        </div>
      </div>

      
     </div>

    </TrendPopup>


    <!-- contributors popup -->
    <TrendPopup
      v-model="isContributorsOpen"
       title="Contributors Insight"
      logo="https://i.ibb.co.com/rGSXLKX4/money.webp"
       >
      <div class="flex flex-col gap-4">
          <!-- row -->
        <div
          class="flex flex-col gap-4 p-4 rounded-sm bg-light-bg-container backdrop-blur-[25px] dark:bg-dark-bg-container"
        >
          <h3
            class="text-light-text-darkgray dark:text-white text-lg font-semibold"
          >
            Top Contributors
          </h3>

          <!-- data-content -->
          <div
            class="flex flex-col items-start flex-grow flex-shrink [flex-basis: auto] self-stretch -ml-4 min-w-0 min-h-0"
          >
            <!-- data-content -->
            <div
              class="flex flex-col items-start justify-center flex-grow flex-shrink [flex-basis: auto] w-full gap-4 min-w-0 min-h-0"
            >
              <div
                class="flex flex-col items-center justify-center flex-grow flex-shrink [flex-basis: auto] w-full gap-2 pt-6 pb-6 min-h-[21.25rem] min-w-0"
              >
                <div class="flex items-center justify-center p-4">
                  <div
                    class="relative flex items-center justify-center w-[10.0625rem] h-[10.0625rem]"
                  >
                    <img
                      src="https://i.ibb.co.com/vx2RDHM3/svgviewer-png-output-3.webp"
                      alt="list"
                      class="w-32 h-32"
                    />
                  </div>
                </div>

                <div class="flex flex-col items-center gap-2 text-center">
                  <span
                    class="text-base leading-6 text-light-text-secondary dark:text-dark-text-secondary"
                    >No trend to show at the moment</span
                  >
                  <a href="#" class="text-base leading-6">
                    <span
                      class="text-base leading-6 text-light-text-secondary dark:text-dark-text-secondary underline"
                      >Learn ways to earn</span
                    >
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- row -->
        <div
          class="flex flex-col gap-4 p-4 rounded-sm bg-light-bg-container backdrop-blur-[25px] dark:bg-dark-bg-container"
        >
          <h3
            class="text-light-text-darkgray dark:text-white text-lg font-semibold"
          >
            Top Fans
          </h3>

          <!-- data-content -->
          <div
            class="flex flex-col items-start flex-grow flex-shrink [flex-basis: auto] self-stretch -ml-4 min-w-0 min-h-0"
          >
            <!-- data-content -->
            <div
              class="flex flex-col items-start justify-center flex-grow flex-shrink [flex-basis: auto] w-full gap-4 min-w-0 min-h-0"
            >
              <div
                class="flex flex-col items-center justify-center flex-grow flex-shrink [flex-basis: auto] w-full gap-2 pt-6 pb-6 min-h-[21.25rem] min-w-0"
              >
                <div class="flex items-center justify-center p-4">
                  <div
                    class="relative flex items-center justify-center w-[10.0625rem] h-[10.0625rem]"
                  >
                    <img
                      src="https://i.ibb.co.com/vx2RDHM3/svgviewer-png-output-3.webp"
                      alt="list"
                      class="w-32 h-32"
                    />
                  </div>
                </div>

                <div class="flex flex-col items-center gap-2 text-center">
                  <span
                    class="text-base leading-6 text-light-text-secondary dark:text-dark-text-secondary"
                    >No trend to show at the moment</span
                  >
                  <a href="#" class="text-base leading-6">
                    <span
                      class="text-base leading-6 text-light-text-secondary dark:text-dark-text-secondary underline"
                      >Learn ways to earn</span
                    >
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- row -->
        <div
          class="flex flex-col gap-4 p-4 rounded-sm bg-light-bg-container backdrop-blur-[25px] dark:bg-dark-bg-container"
        >
          <h3
            class="text-light-text-darkgray dark:text-white text-lg font-semibold"
          >
            Top Order Spenders
          </h3>

          <!-- data-content -->
          <div
            class="flex flex-col items-start flex-grow flex-shrink [flex-basis: auto] self-stretch -ml-4 min-w-0 min-h-0"
          >
            <!-- data-content -->
            <div
              class="flex flex-col items-start justify-center flex-grow flex-shrink [flex-basis: auto] w-full gap-4 min-w-0 min-h-0"
            >
              <div
                class="flex flex-col items-center justify-center flex-grow flex-shrink [flex-basis: auto] w-full gap-2 pt-6 pb-6 min-h-[21.25rem] min-w-0"
              >
                <div class="flex items-center justify-center p-4">
                  <div
                    class="relative flex items-center justify-center w-[10.0625rem] h-[10.0625rem]"
                  >
                    <img
                      src="https://i.ibb.co.com/vx2RDHM3/svgviewer-png-output-3.webp"
                      alt="list"
                      class="w-32 h-32"
                    />
                  </div>
                </div>

                <div class="flex flex-col items-center gap-2 text-center">
                  <span
                    class="text-base leading-6 text-light-text-secondary dark:text-dark-text-secondary"
                    >No trend to show at the moment</span
                  >
                  <a href="#" class="text-base leading-6">
                    <span
                      class="text-base leading-6 text-light-text-secondary dark:text-dark-text-secondary underline"
                      >Learn ways to earn</span
                    >
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
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import TrendPopup from '@/components/ui/popup/TrendPopup.vue'
import ChartContainer from '@/components/ui/chart/ChartContainer.vue'

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

const store = useDashboardAnalytics()
const { lastUpdated } = storeToRefs(store)

function formatTime(dateString) {
  if (!dateString) return 'Never'
  const date = new Date(dateString)
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

async function handleRefresh() {
  await store.loadAnalytics() 
}

// when component load so data will be here
onMounted(() => {
  store.loadAnalytics()
})

</script>

 
