import { h } from "vue";

export const MountainIcon = {
  render() {
    return h(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
      },
      [h("path", { d: "m8 3 4 8 5-5 5 15H2L8 3z" })]
    );
  },
};

export const MenuIcon = {
  render() {
    return h(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
      },
      [
        h("line", { x1: "4", x2: "20", y1: "12", y2: "12" }),
        h("line", { x1: "4", x2: "20", y1: "6", y2: "6" }),
        h("line", { x1: "4", x2: "20", y1: "18", y2: "18" }),
      ]
    );
  },
};
