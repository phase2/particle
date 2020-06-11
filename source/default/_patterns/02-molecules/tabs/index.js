/**
 * tabs
 */

import $ from 'jquery';

// Module dependencies
import 'protons';

// Module template
import './_tabs.twig';

// Module css
import './tabs.css';

export const name = 'tabs';
export const tabsState = [];

// The tab switching function
export const switchTab = (tabsGroup) => {
  tabsGroup.forEach((item) => {
    if (item.selected) {
      // Select tab.
      $(`#${item.id}`)
        .removeAttr('tabindex')
        .attr('aria-selected', 'true')
        .focus();
    } else {
      // Hide unselected panel.
      $(`#${item.id}`).attr('tabindex', '-1').removeAttr('aria-selected');
    }
    // Show/hide selected panel.
    $(`#${item.panelId}`).prop('hidden', !item.selected);
  });
};

// Initially first tab to selected then update tab and panel based on state.
export const initTabs = (tabsGroup) => {
  const tabsInitialized = tabsGroup.map(function mapTabsInitial(item, i) {
    return {
      id: item.id,
      panelId: item.panelId,
      selected: i === 0,
    };
  });
  return tabsInitialized;
};

// Return current selected index.
export const selectedIndexState = (tabsGroup) => {
  const currentSelectedIndex = tabsGroup.reduce(function filterCurrentSelected(
    acc,
    value,
    i
  ) {
    return value.selected ? i : acc;
  },
  0);
  return currentSelectedIndex;
};

// Update tab selected state.
export const updateSelectedState = (selectedIndex, tabsGroup) => {
  const tabsSelected = tabsGroup.map(function mapTabsSelected(item, i) {
    return {
      id: item.id,
      panelId: item.panelId,
      selected: i === selectedIndex,
    };
  });
  return tabsSelected;
};

/**
 * Components may need to run clean-up tasks if they are removed from DOM.
 *
 * @param {jQuery} $context - A piece of DOM
 * @param {Object} settings - Pertinent settings
 */
// eslint-disable-next-line no-unused-vars
export function disable($context, settings) {}

/**
 * Each component has a chance to run when its enable function is called. It is
 * given a piece of DOM ($context).
 *
 * @param {jQuery} $context - A piece of DOM
 */
export function enable($context) {
  // Get relevant elements and collections
  const $tabsWrapper = $('.tabs', $context);

  $tabsWrapper.each(function eachTabsGroup() {
    // Set initial objects.
    let tabsGroup = [];

    const $tabWrapper = $(this);
    const $tabs = $('.tabs__list-link', $tabWrapper);
    const $panels = $('.tabs__panels-item', $tabWrapper);
    // Add to tabState for each tab collection.
    tabsState.push(tabsGroup);

    const getTabsState = () => {
      return tabsGroup;
    };
    const getSelectedIndex = () => {
      const tabsData = getTabsState();
      return selectedIndexState(tabsData);
    };

    // Add semantics are remove user focusability for each tab
    $tabs.each(function tabsInit(i, tab) {
      const tabObject = {
        id: $(tab).attr('id'),
        panelId: $(tab).attr('aria-controls'),
        selected: false,
      };
      tabsGroup.push(tabObject);

      // Handle clicking of tabs for mouse users
      $(tab).on('click', (e) => {
        e.preventDefault();
        // Get selected.
        const selectedIndex = getSelectedIndex();
        // Get current index.
        const targetIndex = $tabs.index(e.currentTarget);
        // Switch tab if clicked tab is not current tab.
        if (targetIndex !== selectedIndex) {
          const tabsUpdated = updateSelectedState(targetIndex, tabsGroup);
          tabsGroup = tabsUpdated;
          // Update tabs to match state.
          switchTab(tabsUpdated);
        }
      });

      // Handle keydown events for keyboard users
      $(tab).on('keydown', (e) => {
        // Get selected index.
        const index = getSelectedIndex();

        // Work out which key the user is pressing and
        // Calculate the new tab's index where appropriate
        const { key } = e;
        if (key === 'ArrowLeft') {
          let newTabIndex = index - 1;
          // If first item set last items index.
          if (index === 0) {
            newTabIndex = $tabs.length - 1;
          }

          // Update Selected State.
          const tabsUpdated = updateSelectedState(newTabIndex, tabsGroup);
          tabsGroup = tabsUpdated;

          // Update tabs to match state.
          switchTab(tabsUpdated);
        } else if (key === 'ArrowRight') {
          let newTabIndex = index + 1;
          // If last item set new tab index to 0.
          if (index === $tabs.length - 1) {
            newTabIndex = 0;
          }

          // Update Selected State.
          const tabsUpdated = updateSelectedState(newTabIndex, tabsGroup);
          tabsGroup = tabsUpdated;

          // Update tabs to match state.
          switchTab(tabsUpdated);
        } else if (key === 'ArrowDown') {
          $panels[i].focus();
        }
      });
    });

    // Set first tab to selected.
    const tabsInialized = initTabs(tabsGroup);
    tabsGroup = tabsInialized;

    // Initially activate the first tab and reveal the first tab panel.
    switchTab(tabsInialized);
  });
}

export default enable;
