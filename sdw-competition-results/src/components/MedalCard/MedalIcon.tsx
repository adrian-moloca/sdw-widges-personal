import logo from 'assets/images/medal_blank.png';
import { medalColors } from 'config';
import { MedalType } from 'models/model';

interface Props {
  size?: number;
  field?: MedalType;
}
export const MedalIcon = ({ size = 24, field }: Props) => {
  const colors = field ? medalColors[field] : medalColors.golden;
  if (!field)
    return (
      <img
        src={logo}
        alt="Medal Icon"
        height={size}
        width={size}
        style={{ objectFit: 'contain' }}
      />
    );

  return (
    <img
      src={logo}
      alt="Medal Icon"
      height={size}
      width={size}
      style={{ objectFit: 'contain', fill: colors }}
    />
  );
};
