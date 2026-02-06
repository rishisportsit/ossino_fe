import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store/index';
import { selectSessionsData } from 'store/sessions/selectors';
import { getSessions, type Session } from 'store/sessions/slice';
import { useDialog } from 'helpers/hooks';
import { DIALOG_TYPE } from 'store/dialog/slice';
import SessionCard from '../SessionCard';
import LogoutOfAllSessionButton from '../LogoutOfAllSessionsButton';

const SessionsList = () => {
  const dispatch = useAppDispatch();
  const sessions = useAppSelector(selectSessionsData);
  const { openDialog } = useDialog();

  useEffect(() => {
    dispatch(getSessions());
  }, [dispatch]);

  if (!sessions) {
    return null;
  }

  const handleClick = (session: Session) => {
    openDialog(DIALOG_TYPE.deviceLogout, session);
  };

  return (
    <>
      <div className="flex flex-col gap-3 mb-10">
        {sessions.map((session) => (
          <div
            className="cursor-pointer"
            key={session.id}
            onClick={() => handleClick(session)}
          >
            <SessionCard {...session} />
          </div>
        ))}
      </div>
      <LogoutOfAllSessionButton />
    </>
  );
};

export default SessionsList;
