import Image from "./Image.js";

const metadata = {
  component: Image,
};

export default metadata;

const Template = ({ width, ...args }) => (
  <div style={{ width }}>
    <Image {...args} />
  </div>
);

export const Basic = Template.bind({});
Basic.args = {
  src: `${process.env.STORYBOOK_IMAGE_SRC}/160`,
  width: 160,
};

export const Circular = Template.bind({});
Circular.args = {
  ...Basic.args,
  variant: "circular",
};

export const CustomRatio = Template.bind({});
CustomRatio.args = {
  ...Basic.args,
  aspectRatio: "16/9",
};

export const Loading = Template.bind({});
Loading.args = {
  ...Basic.args,
  loading: true,
};

export const Busy = Template.bind({});
Busy.args = {
  ...Basic.args,
  isBusy: true,
};
