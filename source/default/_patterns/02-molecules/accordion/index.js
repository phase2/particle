/**
 * accordion
 */

import $ from 'jquery';

// Module dependencies
import 'protons';

// Module template
import './_accordion.twig';

// Module css
import './accordion.css';

export const name = 'accordion';

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
  // Find our component within the DOM
  const $accordions = $('.accordion', $context);
  // Bail if component does not exist
  if (!$accordions.length) {
    return;
  }
  $accordions.each(function eachAccordion() {
    const $accordion = $(this);
    const $triggers = $('.accordion__trigger', $accordions);

    // Allow for multiple accordion sections to be expanded at the same time
    const allowMultiple = $accordion.data('allow-multiple');
    // Allow for each toggle to both open and close individually
    const allowToggle = allowMultiple || $accordion.data('allow-toggle');

    $accordion.on('click', '.accordion__trigger', function accordionClick(
      event
    ) {
      const $trigger = $(this);
      // Check if the current toggle is expanded.
      const isExpanded = $trigger.attr('aria-expanded') === 'true';
      const active = $('[aria-expanded="true"]', $accordion);
      // without allowMultiple, close the open accordion
      if (!allowMultiple && !isExpanded) {
        // Set the expanded state on the triggering element
        active.attr('aria-expanded', 'false');
        // Hide the accordion sections, using aria-controls to specify the desired section
        $(`#${active.attr('aria-controls')}`, $accordion).prop('hidden', true);

        // When toggling is not allowed, clean up disabled state
        if (!allowToggle) {
          active.removeAttr('aria-disabled');
        }
      }

      if (!isExpanded) {
        // Set the expanded state on the triggering element
        $trigger.attr('aria-expanded', 'true');
        // Hide the accordion sections, using aria-controls to specify the desired section
        $(`#${$trigger.attr('aria-controls')}`, $context).prop('hidden', false);

        // If toggling is not allowed, set disabled state on trigger
        if (!allowToggle) {
          $trigger.attr('aria-disabled', 'true');
        }
      } else if (allowToggle && isExpanded) {
        // Set the expanded state on the triggering element
        $trigger.attr('aria-expanded', 'false');
        // Hide the accordion sections, using aria-controls to specify the desired section
        $(`#${$trigger.attr('aria-controls')}`, $context).prop('hidden', true);
      }

      event.preventDefault();
    });

    // Bind keyboard behaviors on the main accordion container
    $accordion.on('keydown', '.accordion__trigger', function accordionKeydown(
      event
    ) {
      const $trigger = $(this);
      // Work out which key the user is pressing and
      // Calculate the new tab's index where appropriate
      const { key } = event;

      // Ctrl with PageDown and PageUp.
      const ctrlModifier = event.ctrlKey && key.match(/PageDown|PageUp/);

      // Is this coming from an accordion header?
      if ($trigger.hasClass('accordion__trigger')) {
        // Up/ Down arrow and Control + Page Up/ Page Down keyboard operations
        if (key.match(/ArrowUp|ArrowDown/) || ctrlModifier) {
          const index = $triggers.index(event.currentTarget);
          const direction = key.match(/PageUp|ArrowDown/) ? 1 : -1;
          const { length } = $triggers;
          const newIndex = (index + length + direction) % length;

          $triggers[newIndex].focus();

          event.preventDefault();
        } else if (key.match(/End|Home/)) {
          if (key === 'Home') {
            // Go to first accordion
            $triggers[0].focus();
          }
          if (key === 'End') {
            // Go to last accordion
            $triggers[$triggers.length - 1].focus();
          }

          event.preventDefault();
        }
      }
    });

    // Minor setup: will set disabled state, via aria-disabled, to an
    // expanded/ active accordion which is not allowed to be toggled close
    if (!allowToggle) {
      // Get the first expanded/ active accordion
      const $expanded = $('[aria-expanded="true"]', $accordion);

      // If an expanded/ active accordion is found, disable
      if ($expanded) {
        $expanded.attr('aria-disabled', 'true');
      }
    }
  });
}

export default enable;
