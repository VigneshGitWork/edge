import React from "react";

function renderElementWrapper(components) {
  return function renderElement(el) {
    if (this.hiddenElements?.includes(el.id)) {
      return null;
    }
    return el.elementtype ? (
      components[el.elementtype] ? (
        React.createElement(
          components[el.elementtype],
          {
            ...el.elementProps,
            key: `${el.id}-${el.elementtype}`,
            ...this[el.id],
            // ...(el.elementtype === "Button" && {
            //   variation:
            //     this.disabledElement?.indexOf(el.id) >= 0 ? "LOADING DISABLED" : "",
            // }),
          },
          el.childElements?.length
            ? el.childElements.map(renderElement, this)
            : el.aemlabel
        )
      ) : (
        React.createElement(
          el.elementtype,
          {
            ...el.elementProps,
            key: `${el.id}-${el.elementtype}`,
            className: el.classes,
            disabled: this.disabledElement?.indexOf(el.id) >= 0,
          },
          el.childElements?.length
            ? el.childElements.map(renderElement, this)
            : el.aemlabel
        )
      )
    ) : el.renderHTML ? (
      <div
        className={el.classes}
        key={`${el.id}-${el.key}`}
        disabled={this.disabledElement?.indexOf(el.id) >= 0}
        dangerouslySetInnerHTML={{
          __html: el.renderHTML ? el.aemlabel : null,
        }}
      />
    ) : (
      <div
        className={el.classes}
        key={`${el.id}-${el.key}`}
        disabled={this.disabledElement?.indexOf(el.id) >= 0}
      >
        {el.childElements?.length
          ? el.childElements.map(renderElement, this)
          : el.aemlabel}
      </div>
    );
  };
}

export default renderElementWrapper;
