import Icon from 'components/shared/Icon';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'components/shared/ui/Table';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store/index';
import { selectLevelsData } from 'store/levels/selectors';
import { getLevels } from 'store/levels/slice';
import tickCircle from '/icons/tickCircle.svg?url';

const LevelsOverview = () => {
  const dispatch = useAppDispatch();
  const levels = useAppSelector(selectLevelsData);

  useEffect(() => {
    dispatch(getLevels());
  }, [dispatch]);

  if (!levels) {
    return null;
  }

  const { overview, images } = levels;

  return (
    <div className="xl:p-5 xl:bg-base-800 xl:rounded-xl">
      <h3 className="mb-3 font-bold xl:text-lg">Levels overview</h3>
      <div className="border border-base-700 rounded-xl h-min overflow-hidden xl:border-none xl:rounded-none">
        <Table>
          <TableHeader className="bg-base-860 xl:h-16 xl:border-b-[12px] border-base-800">
            <TableRow>
              <TableHead className="text-sm body-txtColor-1 font-regular">
                Benefit
              </TableHead>
              {images.map(({ level, image }) => (
                <TableHead key={level} className="relative h-14">
                  <div className="w-8 h-8 xl:w-10 xl:h-10 rounded-full bg-base-700 flex items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <img src={image} alt={level} width={24} height={24} className='w-4 h-4 xl:w-6 xl:h-6' />
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {levels
              ? overview.map(({ id, ...benefit }) => (
                <TableRow
                  key={id}
                  className="w-full border-b border-b-base-900 "
                >
                  {Object.keys(benefit).map((key) => {
                    if (key === 'feature') {
                      return (
                        <TableCell key={key} className="text-base-200 min-w-[194px]">
                          {benefit[key]}
                        </TableCell>
                      );
                    }

                    return (
                      <TableCell align="center" className="px-[22px]" key={key}>
                        {benefit[key as keyof typeof benefit] ? (
                          <div className='w-5 h-5'>
                            <Icon
                              id="tickCircleIcon"
                              href={tickCircle}
                              className="text-primary-1"
                            />
                          </div>
                        ) : null}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
              : null}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default LevelsOverview;
