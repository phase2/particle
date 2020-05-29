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
 * given a piece of DOM ($context) and a settings object. We destructure our
 * component key off the settings object and provide an empty object fallback.
 * Incoming settings override default settings via Object.assign().
 *
 * @param {jQuery} $context - A piece of DOM
 * @param {Object} settings - Settings object
 */
export function enable($context) {
  // Get relevant elements and collections
  const $tabsWrapper = $('.tabs', $context);

  const deactivatePanels = ($panels) => {
    $panels.each(function panelsHidden() {
      $(this).prop('hidden', true);
    });
  };

  $tabsWrapper.each(function eachTabsGroup() {
    const $this = $(this);
    const $tablist = $('.tabs__list', $this);
    const $tabs = $('.tabs__list-link', $this);
    const $panels = $('.tabs__panels-item', $this);

    // The tab switching function
    const switchTab = (oldTab, newTab) => {
      newTab.focus();
      // Get id of panel controlled by newTab.
      const newPanelId = $(newTab).attr('aria-controls');
      // Make the active tab focusable by the user (Tab key) and add aria selected.
      $(newTab).removeAttr('tabindex').attr('aria-selected', 'true');
      $(oldTab).removeAttr('aria-selected').attr('tabindex', '-1');

      // Hide all panels.
      deactivatePanels($panels);
      // Unhide new panel.
      $(`#${newPanelId}`, $context).prop('hidden', false);
    };

    // Add semantics are remove user focusability for each tab
    $tabs.each(function tabsInit(i, tab) {
      $(tab).attr('tabindex', '-1');

      // Handle clicking of tabs for mouse users
      $(tab).on('click', (e) => {
        e.preventDefault();
        const $currentTab = $('[aria-selected="true"]', $tablist);
        // Switch tab if clicked tab is not current tab.
        if ($(e.currentTarget)[0] !== $currentTab[0]) {
          switchTab($currentTab, e.currentTarget);
        }
      });

      // Handle keydown events for keyboard users
      $(tab).on('keydown', (e) => {
        // Get the index of the current tab in the tabs node list
        const index = $tabs.index(e.currentTarget);

        // Work out which key the user is pressing and
        // Calculate the new tab's index where appropriate
        const { key } = e;
        if (key === 'ArrowLeft') {
          e.preventDefault();
          let newTabIndex = index - 1;
          // If first item set last items index.
          if (index === 0) {
            newTabIndex = $tabs.length - 1;
          }
          switchTab(e.currentTarget, $tabs[newTabIndex]);
        } else if (key === 'ArrowRight') {
          e.preventDefault();
          let newTabIndex = index + 1;
          // If last item set new tab index to 0.
          if (index === $tabs.length - 1) {
            newTabIndex = 0;
          }
          switchTab(e.currentTarget, $tabs[newTabIndex]);
        } else if (key === 'ArrowDown') {
          $panels[i].focus();
        }
      });
    });

    // Add tab panel semantics and hide them all.
    $panels.each((i, panel) => {
      $(panel).attr('tabindex', '-1');
      $(panel).attr('aria-labelledby', $tabs[i].id);
      $(panel).attr('hidden', true);
    });

    // Initially activate the first tab and reveal the first tab panel.
    $($tabs[0]).removeAttr('tabindex');
    $($tabs[0]).attr('aria-selected', 'true');
    $($panels[0]).attr('hidden', false);
  });
}

export default enable;
