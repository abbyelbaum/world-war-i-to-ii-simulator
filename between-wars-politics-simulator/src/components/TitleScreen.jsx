export default function TitleScreen({ onStart }) {
  return (
    <div className="screen screen-title">
      <div className="title-frame">
        <div className="title-eyebrow">A POLITICAL HISTORY GAME · 1933 — 1939</div>
        <h1 className="title-main">BETWEEN THE WARS</h1>
        <div className="title-sub">
          Take command of a great power on the road from the rise of Hitler
          to the invasion of Poland. The choices are yours. So are the
          consequences.
        </div>
        <div className="title-flags">
          <span className="flag-chip flag-us">US</span>
          <span className="flag-chip flag-britain">UK</span>
          <span className="flag-chip flag-france">FR</span>
          <span className="flag-chip flag-germany">DE</span>
          <span className="flag-chip flag-italy">IT</span>
          <span className="flag-chip flag-ussr">USSR</span>
          <span className="flag-chip flag-poland">PL</span>
          <span className="flag-chip flag-czechoslovakia">CZ</span>
          <span className="flag-chip flag-yishuv">YSH</span>
        </div>
        <button className="big-button" onClick={onStart}>
          Begin
        </button>
        <div className="title-footnote">
          One playthrough is about 15 minutes. No accounts, no data stored.
        </div>
      </div>
    </div>
  )
}
