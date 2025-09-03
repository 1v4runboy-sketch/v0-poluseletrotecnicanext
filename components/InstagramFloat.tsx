'use client';

type Props = { href: string; user?: string; name?: string; followersText?: string };
export default function InstagramFloat({ href, user='@username', name='Instagram', followersText='800+ Followers' }: Props){
  return (
    <div className="float-stack" style={{ bottom: 70 }}>
      <div className="ig-tooltip-container">
        <div className="ig-tooltip">
          <div className="ig-profile">
            <div className="flex items-center gap-2">
              <div className="w-[42px] h-[42px] font-bold border border-[#e6683c] rounded-[10px] flex items-center justify-center bg-white text-[#e6683c]">IG</div>
              <div className="flex flex-col leading-tight">
                <div className="text-[16px] font-bold text-[#e6683c]">{name}</div>
                <div className="text-white opacity-80">{user}</div>
              </div>
            </div>
            <div className="text-slate-300 text-sm pt-1">{followersText}</div>
          </div>
        </div>
        <a className="ig-icon" href={href} target="_blank" rel="noopener noreferrer">
          <div className="ig-layer">
            <span></span><span></span><span></span><span></span>
            <span className="instagramSVG">
              <svg fill="white" className="svgIcon" viewBox="0 0 448 512" height="1.3em" xmlns="http://www.w3.org/2000/svg">
                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8z"/>
              </svg>
            </span>
          </div>
          <div className="ig-text">Instagram</div>
        </a>
      </div>
    </div>
  );
}
