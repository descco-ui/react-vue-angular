(function() {
  const currentDocument = document.currentScript.ownerDocument;

  const togakure = window.TOGAKURE || {};
  const classes = togakure.styles ? togakure.styles.tooltip : {};

  class Tooltip extends HTMLElement {
    constructor() {
      super();

      this.elm_edges = undefined;
      this.tooltip_text = undefined;

      this.addEventListener('mouseover', e => {
        this.tooltipMouseOver();
      });

      this.addEventListener('mouseout', e => {
        this.tooltipMouseOut();
      });
    }

    connectedCallback() {
      const shadowRoot = this.attachShadow({ mode: 'open' });
      const template = currentDocument.querySelector('#tooltip-template');
      const instance = template.content.cloneNode(true);
      shadowRoot.appendChild(instance);

      const text = this.getAttribute('text');
      const content = this.getAttribute('content');
      const position = this.getAttribute('position');

      this.render({ text, content, position });
    }

    create($tooltip) {
      this.elm_edges = $tooltip.getBoundingClientRect();
      this.tooltip_text = document.createElement('span');
      this.tooltip_text.innerHTML = $tooltip.getAttribute('content');
      $tooltip.appendChild(this.tooltip_text);

      if (this.elm_edges.left > window.innerWidth - 100) {
        $tooltip.className = `${classes.tooltip} tooltip--left`;
      } else if ((this.elm_edges.left + (this.elm_edges.width / 2)) < 100) {
        $tooltip.className = `${classes.tooltip} tooltip--right`;
      } else {
        $tooltip.className = `${classes.tooltip} tooltip--center`;
      }
    }

    position($tooltip) {
      // 10 = arrow height
      const elm_top = this.elm_edges.top + this.elm_edges.height + 10;
      const viewport_edges = window.innerWidth - 100;

      // Position tooltip on the left side of the elm if the elm touches
      // the viewports right edge and elm width is < 50px.
      if (this.elm_edges.left > viewport_edges && this.elm_edges.width < 50) {
        $tooltip.style.left = (this.elm_edges.left - ($tooltip.offsetWidth + this.elm_edges.width)) + 'px';
        $tooltip.style.top = $tooltip.offsetTop + 'px';
      // Position tooltip on the left side of the elm if the elm touches
      // the viewports right edge and elm width is > 50px.
      } else if (this.elm_edges.left > viewport_edges && this.elm_edges.width > 50) {
        $tooltip.style.left = (this.elm_edges.left - $tooltip.offsetWidth - 20) + 'px';
        $tooltip.style.top = $tooltip.offsetTop + 'px';
      } else if ((this.elm_edges.left + (this.elm_edges.width / 2)) < 100) {
        // position tooltip on the right side of the elm.
        $tooltip.style.left = (this.elm_edges.left + this.elm_edges.width + 20) + 'px';
        $tooltip.style.top = $tooltip.offsetTop + 'px';
      } else {
        // Position the toolbox in the center of the elm.
        const centered = (this.elm_edges.left + (this.elm_edges.width / 2)) - ($tooltip.offsetWidth / 2);
        $tooltip.style.left = centered + 'px';
        $tooltip.style.top = elm_top + 'px';
      }
    }

    tooltipMouseOver() {
      const $tooltip = this.shadowRoot.querySelector('.tooltip');

      this.create($tooltip);
      this.position($tooltip);
    }

    tooltipMouseOut() {
      const $tooltip = this.shadowRoot.querySelector('.tooltip');

      $tooltip.className = 'tooltip no-display';
      $tooltip.removeChild($tooltip.firstChild);
      $tooltip.removeAttribute('style');
    }

    render(props) {
      const $tooltip = this.shadowRoot.querySelector('.tooltip');

      $tooltip.innerText = props.text;
      $tooltip.classList.add(`tooltip--${classes[props.position]}`);
    }
  }

  customElements.define('tog-tooltip', Tooltip);
})();



// (function() {
//   "use strict";

//   let tooltip, elm_edges, tooltip_text;

//   var Tooltip = {
//       create: function(tooltip, elm) {
//           // elm_edges relative to the viewport.
//           elm_edges = elm.getBoundingClientRect();
//           tooltip_text = document.createTextNode(elm.getAttribute('data-tooltip'));
//           tooltip.appendChild(tooltip_text);

//           // Remove no-display + set the correct classname based on the position
//           // of the elm.
//           if (elm_edges.left > window.innerWidth - 100) {
//               tooltip.className = 'tooltip-container tooltip-left';
//           } else if ((elm_edges.left + (elm_edges.width / 2)) < 100) {
//               tooltip.className = 'tooltip-container tooltip-right';
//           } else {
//               tooltip.className = 'tooltip-container tooltip-center';
//           }
//       },
//       position: function(tooltip, elm) {
//           // 10 = arrow height
//           const elm_top = elm_edges.top + elm_edges.height + 10;
//           const viewport_edges = window.innerWidth - 100;

//           // Position tooltip on the left side of the elm if the elm touches
//           // the viewports right edge and elm width is < 50px.
//           if (elm_edges.left > viewport_edges && elm_edges.width < 50) {
//               tooltip.style.left = (elm_edges.left - (tooltip.offsetWidth + elm_edges.width)) + 'px';
//               tooltip.style.top = elm.offsetTop + 'px';
//           // Position tooltip on the left side of the elm if the elm touches
//           // the viewports right edge and elm width is > 50px.
//           } else if (elm_edges.left > viewport_edges && elm_edges.width > 50) {
//               tooltip.style.left = (elm_edges.left - tooltip.offsetWidth - 20) + 'px';
//               tooltip.style.top = elm.offsetTop + 'px';
//           } else if ((elm_edges.left + (elm_edges.width / 2)) < 100) {
//               // position tooltip on the right side of the elm.
//               tooltip.style.left = (elm_edges.left + elm_edges.width + 20) + 'px';
//               tooltip.style.top = elm.offsetTop + 'px';
//           } else {
//               // Position the toolbox in the center of the elm.
//               const centered = (elm_edges.left + (elm_edges.width / 2)) - (tooltip.offsetWidth / 2);
//               tooltip.style.left = centered + 'px';
//               tooltip.style.top = elm_top + 'px';
//           }
//       }
//   };

//   function showTooltip(evt) {
//       const item = Object.create(Tooltip);
//       item.create(tooltip, evt.currentTarget);
//       item.position(tooltip, evt.currentTarget);
//   }

//   function hideTooltip() {
//       tooltip.className = 'tooltip-container no-display';
//       tooltip.removeChild(tooltip.firstChild);
//       tooltip.removeAttribute('style');
//   }

//   function onReady() {
//       tooltip = document.documentElement.querySelector('.tooltip-container');
//       const tooltip_elms = document.documentElement.querySelectorAll('[data-tooltip]');

//       Array.prototype.forEach.call(tooltip_elms, function(elm) {
//           elm.addEventListener('mouseover', showTooltip, false);
//           elm.addEventListener('mouseout', hideTooltip, false);
//       });
//   }

//   document.addEventListener('DOMContentLoaded', onReady, false);
// })();
