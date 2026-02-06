import NotificationToggle from '../NotificationToggle';

const items = [
  { id: 1, label: 'Messages' },
  { id: 2, label: 'Tips' },
  { id: 3, label: 'News & Updates' },
  { id: 4, label: 'Product Updates' },
];

const NotificationToggles = () => {
  return (
    <div className="flex flex-col gap-3">
      {items.map(({ id, label }) => (
        <NotificationToggle key={id} label={label} />
      ))}
    </div>
  );
};

export default NotificationToggles;
