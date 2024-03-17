import { expect, it, describe } from "vitest";
import { renderSuspended } from "@nuxt/test-utils/runtime";
import { screen, fireEvent } from "@testing-library/vue";
import AttributeButton from "../AttributeButton.vue";

describe("AttributeButton", () => {
  //arrange
  const effect = "remove-background";
  const attributes = reactive({ effect: {} });

  it("can render", async () => {
    const buttonName = "hi";
    await renderSuspended(AttributeButton, {
      slots: {
        default: () => buttonName,
      },
      props: {
        effect,
        modelValue: attributes,
      },
    });
    // assert
    expect(screen.getByText(buttonName));
  });

  it("changes the effect to true when clicked", async () => {
    // arrange
    const buttonName = "Remove Background";

    const wrapper = await renderSuspended(AttributeButton, {
      slots: {
        default: () => buttonName,
      },
      props: {
        effect,
        modelValue: attributes,
        "onUpdate:modelValue": (e: {}) => wrapper.rerender({ modelValue: e }),
      },
    });
    // act
    await fireEvent.click(screen.getByText(buttonName));
    expect(attributes).toEqual({ effect: { [effect]: true } });
  });
});
