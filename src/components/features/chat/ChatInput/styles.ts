export const MentionsInputStyles = {
  container: { position: 'static' },
  input: {
    zIndex: '2',
    backgroundColor: '#2C2C2C',
    borderRadius: '8px',
    padding: '16px',
    paddingRight: '80px',
    fontSize: '14px',
    fontWeight: '400',
    minHeight: '53px',
    maxHeight: '104px'
  },
  suggestions: {
    width: 'calc(100%+32px)',
    top: '-130px',
    height: '115px',
    marginTop: '0px',
    left: '-16px',
    right: '-16px',
    backgroundColor: '#141414',
    overflow: 'auto',
    borderTopLeftRadius: '12px',
    borderTopRightRadius: '12px',
    color: '#C1FF11',
    paddingTop: '8px',
    borderBottom: '1px solid #2A2E38',
    list: { color: '#C1FF11' },
    item: {
      height: '33px',
      padding: '0px 16px',
      display: {
        color: '#C1FF11',
        fontSize: '14px'
      }
    }
  }
};

export const EmojiPickerStyles = {
  'width': '100%',
  'borderColor': '#141414',
  '--epr-bg-color': '#141414',
  '--epr-category-label-bg-color': '#141414',
  '--epr-picker-border-color': 'transparent',
  '--epr-search-input-bg-color': '#2C2C2C',
  '--epr-search-input-bg-color-active': '#2C2C2C',
  '--epr-hover-bg-color': '#2C2C2C',
  '--epr-emoji-hover-color': '#2C2C2C',
  '--epr-hover-bg-color-reduced-opacity': '#2C2C2C'
};
