<template>
  <DashboardOrdersPageContentCreator>
      <!-- section-header -->
      <div class="flex flex-col items-start justify-between p-2 sm:flex-row sm:items-center md:p-4">
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
            class="m-0 font-medium text-xl leading-[1.875rem] text-light-text-quaternary dark:text-dark-text-quaternary"
          >
            Overview/Insight
          </h2>
        </div>
        <!-- last-date -->
        <div class="flex items-center gap-4 w-full justify-between sm:justify-end sm:w-auto">
          <span class="text-sm leading-5 text-light-text-quaternary dark:text-dark-text-quaternary"
            >Last updated at
            <span
              class="text-sm leading-5 text-light-text-quaternary dark:text-dark-text-quaternary"
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
              class="text-xs font-medium leading-[1.125rem] text-light-primary dark:text-dark-primary group-hover:text-white dark:group-hover:text-[#e8e6e3]"
              >Refresh</span
            >
          </button>
        </div>
      </div>

      <!-- row -->
      <div
        class="grid grid-cols-1 gap-4 px-0 pt-0 pb-4 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 md:px-4"
      >
        <!-- left-column -->
        <div class="flex flex-col gap-4">
          <!-- subscribers -->
          <DashboardCard>
            <div
              class="flex flex-col flex-grow flex-shrink [flex-basis: auto] gap-4 min-w-0 min-h-0"
            >
              <!-- hover-overlay -->
              <div
                class="absolute hidden group-hover/container:flex items-start justify-end w-full h-full top-0 left-0 z-[10000] [box-shadow:0_0_10px_0_rgba(0,_0,_0,_0.25)]"
              >
                <button
                  class="group/button flex items-center justify-center gap-1 pl-[0.9375rem] pr-2 py-1 bg-light-bg-button dark:bg-dark-bg-button [clip-path:polygon(0_0,100%_0,105%_105%,16%_105%)] hover/container:bg-light-primary dark:hover/container:bg-dark-primaryHover"
                >
                  <span
                    class="text-xs font-medium leading-[1.125rem] text-light-primary dark:text-dark-primary group-hover/button:text-white dark:group-hover/button:text-[#e8e6e3]"
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
                  class="m-0 font-medium text-base leading-6 text-light-text-secondary dark:text-dark-text-secondary"
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
                        class="text-xs font-medium leading-[1.125rem] text-light-text-tertiary dark:text-dark-text-tertiary"
                        >New</span
                      >
                    </div>

                    <div class="flex justify-between">
                      <span>
                        <span
                          class="text-[2.25rem] font-semibold leading-[2.75rem] tracking-[-0.045rem] text-light-text-primary dark:text-dark-text-primary"
                          >--</span
                        >
                      </span>
                      <div></div>
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
                        class="text-xs font-medium leading-[1.125rem] text-light-text-tertiary dark:text-dark-text-tertiary"
                        >RECURRING</span
                      >
                    </div>

                    <div class="flex justify-between">
                      <span>
                        <span
                          class="text-[2.25rem] font-semibold leading-[2.75rem] tracking-[-0.045rem] text-light-text-primary dark:text-dark-text-primary"
                          >--</span
                        >
                      </span>
                      <div></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DashboardCard>

          <!-- fans-->
          <DashboardCard>
            <div
              class="flex flex-col flex-grow flex-shrink [flex-basis: auto] gap-4 min-w-0 min-h-0"
            >
              <!-- hover-overlay -->
              <div
                class="absolute hidden group-hover/container:flex items-start justify-end w-full h-full top-0 left-0 z-[10000] [box-shadow:0_0_10px_0_rgba(0,_0,_0,_0.25)]"
              >
                <button
                  class="group/button flex items-center justify-center gap-1 pl-[0.9375rem] pr-2 py-1 bg-light-bg-button dark:bg-dark-bg-button [clip-path:polygon(0_0,100%_0,105%_105%,16%_105%)] hover/container:bg-light-primary dark:hover/container:bg-dark-primaryHover"
                >
                  <span
                    class="text-xs font-medium leading-[1.125rem] text-light-primary dark:text-dark-primary group-hover/button:text-white dark:group-hover/button:text-[#e8e6e3]"
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
                  class="m-0 font-medium text-base leading-6 text-light-text-secondary dark:text-dark-text-secondary"
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
                      class="text-xs font-medium leading-[1.125rem] whitespace-nowrap text-light-text-tertiary dark:text-dark-text-tertiary"
                      >NEW FOLLOWERS</span
                    >

                    <div class="flex items-end justify-between w-full gap-1">
                      <span
                        class="text-[1.875rem] font-semibold leading-[2.375rem] text-light-text-primary dark:text-dark-text-primary"
                        >--</span
                      >
                      <div></div>
                    </div>
                  </div>

                  <div class="flex flex-col gap-2 w-full flex-shrink items-start">
                    <span
                      class="text-xs font-medium leading-[1.125rem] whitespace-nowrap text-light-text-tertiary dark:text-dark-text-tertiary"
                      >PROFILE VISIT</span
                    >

                    <div class="flex items-end justify-between w-full gap-1">
                      <span
                        class="text-[1.875rem] font-semibold leading-[2.375rem] text-light-text-primary dark:text-dark-text-primary"
                        >--</span
                      >
                      <div></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DashboardCard>
        </div>

        <!-- middle-column -->
        <div class="flex flex-col gap-4">
          <!-- earnings-->
          <DashboardCard>
            <div
              class="flex flex-col flex-grow flex-shrink [flex-basis: auto] gap-4 min-w-0 min-h-0"
            >
              <!-- hover-overlay -->
              <div
                class="absolute hidden group-hover/container:flex items-start justify-end w-full h-full top-0 left-0 z-[10000] [box-shadow:0_0_10px_0_rgba(0,_0,_0,_0.25)]"
              >
                <button
                  class="group/button flex items-center justify-center gap-1 pl-[0.9375rem] pr-2 py-1 bg-light-bg-button dark:bg-dark-bg-button [clip-path:polygon(0_0,100%_0,105%_105%,16%_105%)] hover/container:bg-light-primary dark:hover/container:bg-dark-primaryHover"
                >
                  <span
                    class="text-xs font-medium leading-[1.125rem] text-light-primary dark:text-dark-primary group-hover/button:text-white dark:group-hover/button:text-[#e8e6e3]"
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
                  class="m-0 font-medium text-base leading-6 text-light-text-secondary dark:text-dark-text-secondary"
                >
                  Earnings
                </h3>
              </div>

              <div class="flex justify-between">
                <span>
                  <span
                    class="text-[2.25rem] font-semibold leading-[2.75rem] tracking-[-0.045rem] text-light-text-primary dark:text-dark-text-primary"
                    >--</span
                  >
                </span>
                <div></div>
              </div>
            </div>
          </DashboardCard>

          <!-- likes -->
          <DashboardCard
            class="group relative flex flex-col flex-grow flex-shrink [flex-basis: auto] gap-4 p-4 rounded-sm min-w-0 min-h-0 [backdrop-filter:blur(25px)] bg-light-bg-container dark:bg-dark-bg-container"
          >
            <div
              class="flex flex-col flex-grow flex-shrink [flex-basis: auto] gap-4 min-w-0 min-h-0"
            >
              <!-- title -->
              <div class="flex items-center gap-2">
                <h3
                  class="m-0 font-medium text-base leading-6 text-light-text-secondary dark:text-dark-text-secondary"
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
                      class="text-xs font-medium leading-[1.125rem] whitespace-nowrap text-light-text-tertiary dark:text-dark-text-tertiary"
                      >MEDIA</span
                    >

                    <div class="flex items-end justify-between w-full gap-1">
                      <span
                        class="text-[1.875rem] font-semibold leading-[2.375rem] text-light-text-primary dark:text-dark-text-primary"
                        >--</span
                      >
                      <div></div>
                    </div>
                  </div>

                  <div class="flex flex-col gap-2 w-full flex-shrink items-start">
                    <span
                      class="text-xs font-medium leading-[1.125rem] whitespace-nowrap text-light-text-tertiary dark:text-dark-text-tertiary"
                      >MERCH</span
                    >

                    <div class="flex items-end justify-between w-full gap-1">
                      <span
                        class="text-[1.875rem] font-semibold leading-[2.375rem] text-light-text-primary dark:text-dark-text-primary"
                        >--</span
                      >
                      <div></div>
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
                      class="text-xs font-medium leading-[1.125rem] whitespace-nowrap text-light-text-tertiary dark:text-dark-text-tertiary"
                      >PROFILE</span
                    >

                    <div class="flex items-end justify-between w-full gap-1">
                      <span
                        class="text-[1.875rem] font-semibold leading-[2.375rem] text-light-text-primary dark:text-dark-text-primary"
                        >--</span
                      >
                      <div></div>
                    </div>
                  </div>

                  <div class="flex flex-col gap-2 w-full flex-shrink items-start">
                    <span
                      class="text-xs font-medium leading-[1.125rem] whitespace-nowrap text-light-text-tertiary dark:text-dark-text-tertiary"
                      >FEED</span
                    >

                    <div class="flex items-end justify-between w-full gap-1">
                      <span
                        class="text-[1.875rem] font-semibold leading-[2.375rem] text-light-text-primary dark:text-dark-text-primary"
                        >--</span
                      >
                      <div></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DashboardCard>
        </div>

        <!-- right-column -->
        <div class="flex flex-col gap-4 col-span-full xl:col-auto">
          <!-- top contributors -->
          <DashboardCard>
            <div class="flex flex-col gap-4 min-w-0">
              <!-- hover-overlay -->
              <div
                class="absolute hidden group-hover/container:flex items-start justify-end w-full h-full top-0 left-0 z-[10000] [box-shadow:0_0_10px_0_rgba(0,_0,_0,_0.25)]"
              >
                <button
                  class="group/button flex items-center justify-center gap-1 pl-[0.9375rem] pr-2 py-1 bg-light-bg-button dark:bg-dark-bg-button [clip-path:polygon(0_0,100%_0,105%_105%,16%_105%)] hover/container:bg-light-primary dark:hover/container:bg-dark-primaryHover"
                >
                  <span
                    class="text-xs font-medium leading-[1.125rem] text-light-primary dark:text-dark-primary group-hover/button:text-white dark:group-hover/button:text-[#e8e6e3]"
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
                  class="m-0 font-medium text-base leading-6 text-light-text-secondary dark:text-dark-text-secondary"
                >
                  Top Contributors
                </h3>
              </div>

              <!-- data-content -->
              <div
                class="flex flex-col items-start flex-grow flex-shrink [flex-basis: auto] self-stretch -ml-4 min-w-0 min-h-0"
              ></div>
            </div>

            <!-- empty-state -->
            <div
              class="flex flex-col items-start justify-start flex-grow flex-shrink [flex-basis: auto] gap-4 min-w-0 min-h-0"
            >
              <div
                class="absolute pointer-events-none [box-shadow:0_0_10px_0_rgba(0,_0,_0,_0.25)] z-[10000] w-full h-full items-start justify-end hidden left-0 top-0"
              ></div>

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
          </DashboardCard>
        </div>
      </div>
  </DashboardOrdersPageContentCreator>
</template>

<script setup lang="ts">
import DashboardCard from '@/components/layout/dashboard/DashboardCard.vue'
import DashboardOrdersPageContentCreator from './DashboardOrdersPageContentCreator.vue';
</script>
