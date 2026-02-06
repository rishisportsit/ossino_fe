import { type PropsWithChildren } from 'react';

import Slider from 'components/shared/Slider';

import styles from './index.module.css';

const SliderGames = ({ children }: PropsWithChildren) => {
  return <Slider classNameSwiper={styles.sliderShadowGray}>{children}</Slider>;
};

export default SliderGames;
