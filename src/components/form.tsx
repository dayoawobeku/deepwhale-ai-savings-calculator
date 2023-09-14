'use client';

import {useState, useEffect, useMemo} from 'react';
import Image from 'next/image';
import Select from 'react-select';
import toast, {Toaster} from 'react-hot-toast';
import {PostgrestError} from '@supabase/supabase-js';
import {PricingDataItem} from './types';
import {costIc, savingsIc} from '@/assets/images';
import {DropdownIndicator, customStyles} from './custom-select';

function getDurationText(unit: string, value: number) {
  switch (unit) {
    case 'months':
      return value === 1 ? 'month' : 'months';
    case 'weeks':
      return value === 1 ? 'week' : 'weeks';
    case 'hours':
      return value === 1 ? 'hour' : 'hours';
    case 'years':
      return value === 1 ? 'year' : 'years';
    default:
      return unit;
  }
}

export default function Form({
  pricingData,
  error,
}: {
  pricingData: PricingDataItem[];
  error: PostgrestError | null;
}) {
  const [quantity, setQuantity] = useState(8);
  const [savings, setSavings] = useState(0);
  const [serviceUsage, setServiceUsage] = useState({value: 3, unit: 'months'});
  const [cost, setCost] = useState(0);

  const [usageType, setUsageType] = useState({
    value: '',
    label: '',
  });

  useEffect(() => {
    const calculateSavings = () => {
      const pricePerHour =
        pricingData?.find(item => item.usage_type === usageType.value)?.rate ||
        0;

      // Convert service usage to hours
      // assuming all the rates are in hours
      let serviceUsageHours = serviceUsage.value;
      if (serviceUsage.unit === 'weeks') {
        serviceUsageHours *= 7 * 24;
      } else if (serviceUsage.unit === 'months') {
        serviceUsageHours *= 30 * 24;
      } else if (serviceUsage.unit === 'years') {
        serviceUsageHours *= 365 * 24;
      }

      const totalCost = Number(pricePerHour) * serviceUsageHours * quantity;

      const savings = totalCost * (1 - quantity / 100);

      const actualSavings = totalCost - savings;

      setCost(Number(totalCost.toFixed(2)));
      setSavings(Number(actualSavings.toFixed(2)));
    };

    calculateSavings();
  }, [pricingData, quantity, serviceUsage.unit, serviceUsage.value, usageType]);

  useEffect(() => {
    // Set default usageType when pricingData is available
    if (pricingData.length > 0 && usageType.value === '') {
      // remove duplicates
      const uniquePricingData = pricingData.filter(
        (item, index, self) =>
          self.findIndex(t => t.usage_type === item.usage_type) === index,
      );

      setUsageType({
        value: uniquePricingData[0].usage_type as string,
        label: uniquePricingData[0].usage_type as string,
      });

      if (error) {
        toast.error(error.message);
      }
    }
  }, [error, pricingData, usageType]);

  const handleServiceUsageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    setServiceUsage({value: newValue, unit: serviceUsage.unit});
  };

  const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setServiceUsage({value: serviceUsage.value, unit: e.target.value});
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    setQuantity(newValue);
  };

  const options = useMemo(() => {
    return pricingData.map(item => ({
      value: item.usage_type,
      label: item.usage_type,
    }));
  }, [pricingData]);

  return (
    <>
      <Toaster />
      <div className="mt-10 lg:mt-[88px] flex flex-col lg:flex-row gap-10 items-start justify-between">
        <form className="lg:max-w-[373px] w-full">
          <label htmlFor="usageType" className="font-medium text-grey-700">
            What usage type will you be using?
          </label>
          <Select
            inputId="usageType"
            value={usageType}
            onChange={value =>
              setUsageType(
                value as {
                  value: string;
                  label: string;
                },
              )
            }
            options={options}
            placeholder="Select usage type"
            components={{DropdownIndicator, IndicatorSeparator: null}}
            classNamePrefix="react-select"
            className="relative mt-4 w-full border-none font-medium text-grey-900"
            styles={customStyles}
            required
            aria-label="Your answer"
          />
          <label
            htmlFor="duration"
            className="block mt-10 text-grey-700 font-medium"
          >
            How long will you use this service?
          </label>
          <div className="flex items-center gap-5 justify-between">
            <input
              id="duration"
              type="number"
              className="lg:max-w-[177px] w-full mt-[3px] h-[45px] text-grey text-base font-medium px-0 rounded-none outline-none border-b-[0.5px] border-grey-500 placeholder:text-sm placeholder:text-grey-700 focus:border-grey focus:ring-0 focus:text-grey bg-white-800"
              min="0"
              placeholder="Enter a number"
              defaultValue={serviceUsage.value}
              onChange={handleServiceUsageChange}
            />
            <select
              name="unit"
              id="unit"
              onChange={handleUnitChange}
              value={serviceUsage.unit}
              className="lg:max-w-[177px] w-full mt-[3px] h-[45px] text-grey text-base font-medium px-0 rounded-none outline-none border-b-[0.5px] border-grey-500 placeholder:text-sm placeholder:text-grey-700 focus:border-grey focus:ring-0 focus:text-grey bg-white-800 pl-3"
            >
              <option value="hours">hours</option>
              <option value="weeks">weeks</option>
              <option value="months">months</option>
              <option value="years">years</option>
            </select>
          </div>
          <label
            htmlFor="quantity"
            className="block mt-10 text-grey-700 font-medium"
          >
            How many units of this service do you need?
            <div className="flex items-center gap-5 justify-between">
              <input
                id="quantity"
                name="quantity"
                type="number"
                className="max-w-full w-full mt-[3px] h-[45px] text-grey text-base font-medium px-0 rounded-none outline-none border-b-[0.5px] border-grey-500 placeholder:text-sm placeholder:text-grey-700 focus:border-grey focus:ring-0 focus:text-grey bg-white-800"
                min="0"
                placeholder="Enter a number"
                defaultValue={quantity}
                onChange={handleQuantityChange}
              />
            </div>
          </label>
        </form>

        <div className="w-full max-w-full lg:max-w-[540px] xl:max-w-[619px] bg-white p-4 sm:p-8 xl:p-[60px] rounded-xl shadow-[0px_15px_48px_-20px_rgba(0,0,0,0.24)]">
          <div className="mt-4 flex flex-col items-center">
            <p className="text-grey-700 text-sm font-medium">TOTAL SAVINGS</p>
            <p className="text-[2.5rem] text-grey font-bold mt-3 leading-none">
              ${savings}
            </p>
            <p className="mt-6 text-grey-700 font-medium max-w-[300px] text-center">
              Using {quantity} {quantity === 1 ? 'unit' : 'units'} of this
              service for
              <span className="block">
                {serviceUsage.value}{' '}
                {getDurationText(serviceUsage.unit, serviceUsage.value)} will
                save you ${savings}!
              </span>
            </p>

            <div className="my-10 h-[1px] w-full bg-grey-400" />
            <div className="flex flex-col gap-4 w-full">
              <div className="p-6 bg-white-900 flex items-center gap-2 rounded-lg">
                <Image src={savingsIc} alt="" width={40} height={40} />
                <div className="flex flex-col gap-1">
                  <p className="text-grey-700 text-xs font-medium">
                    TOTAL SAVINGS
                  </p>
                  <p className="text-grey font-bold">${savings}</p>
                </div>
              </div>
              <div className="p-6 bg-white-900 flex items-center gap-2 rounded-lg">
                <Image src={costIc} alt="" width={40} height={40} />
                <div className="flex flex-col gap-1">
                  <p className="text-grey-700 text-xs font-medium">
                    TOTAL COST
                  </p>
                  <p className="text-grey font-bold">${cost}</p>
                </div>
              </div>
            </div>
            <a
              href="https://app.deepwhale.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center mt-12 h-12 px-9 bg-grey text-white font-bold rounded-lg text-sm transition-all duration-300 hover:bg-opacity-90 focus:bg-opacity-90"
            >
              Start saving now
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
