'use client';

import {JSX} from 'react';
import Image from 'next/image';
import {
  DropdownIndicatorProps,
  GroupBase,
  components,
  StylesConfig,
} from 'react-select';

const DropdownIndicator = (
  props: JSX.IntrinsicAttributes &
    DropdownIndicatorProps<unknown, boolean, GroupBase<unknown>>,
) => (
  <components.DropdownIndicator {...props}>
    <Image src="/chevron-down.svg" alt="" width={16} height={16} />
  </components.DropdownIndicator>
);

const customStyles: StylesConfig = {
  dropdownIndicator: (provided, state) => ({
    ...provided,
  }),
  control: base => ({
    ...base,
    backgroundColor: 'transparent',
    boxShadow: 'none',
  }),
};

export {DropdownIndicator, customStyles};
