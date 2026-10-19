import { useId } from "react";

export function DeveloperIllustration() {
  const titleId = useId();
  const descriptionId = useId();
  return (
    <svg
      className="developer-illustration"
      viewBox="0 0 540 430"
      role="img"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
    >
      <title id={titleId}>A curious developer’s workspace</title>
      <desc id={descriptionId}>
        An original illustration of a laptop with code, a security shield, a
        notebook, and a plant. It represents building, learning, and
        cybersecurity.
      </desc>
      <g
        stroke="#202020"
        strokeWidth="3"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <path d="M65 53H460V361H65Z" fill="#A3C4F3" />
        <path
          d="M65 82H460M92 53V361M432 53V361M65 333H460"
          fill="none"
          opacity=".25"
        />
        <path d="M112 107H341V277H112Z" fill="#202020" />
        <path d="M103 98H332V268H103Z" fill="#F6F4ED" />
        <path d="M103 126H332" fill="none" />
        <circle cx="117" cy="112" r="3" fill="#FF857A" />
        <circle cx="131" cy="112" r="3" fill="#FFC857" />
        <circle cx="145" cy="112" r="3" fill="#A3C4F3" />
        <path
          d="m166 155-20 19 20 19m62-38 20 19-20 19m-29-43-12 48"
          fill="none"
          strokeWidth="6"
        />
        <path
          d="M136 221H192M205 221H276M136 237H164M178 237H234"
          strokeWidth="5"
        />
        <path d="M89 284H355L332 268H103Z" fill="#FFC857" />
        <path d="M89 284H355V291H89Z" fill="#F6F4ED" />
        <path d="M49 302H476V318H49Z" fill="#F6F4ED" />
        <path d="M75 318V374M451 318V374" strokeWidth="9" />
        <path d="M374 263H417L411 302H380Z" fill="#FF857A" />
        <path
          d="M396 263V213M396 241Q363 242 368 218Q391 213 396 241M396 225Q427 226 423 203Q401 204 396 225"
          fill="#FFC857"
        />
        <g transform="translate(348 107) rotate(9)">
          <path d="M0 0H90V87L45 111 0 87Z" fill="#202020" />
          <path d="M-6-6H84V81L39 105-6 81Z" fill="#FF857A" />
          <path d="M13 14H65V67L39 83 13 67Z" fill="#F6F4ED" />
          <path d="m26 46 10 10 18-23" fill="none" strokeWidth="5" />
        </g>
        <g transform="translate(112 333) rotate(-8)">
          <path d="M0 6H105V70H0Z" fill="#202020" />
          <path d="M-5 0H100V64H-5Z" fill="#FFC857" />
          <path d="M12 17H78M12 30H64M12 43H73" fill="none" />
          <path d="M6-5V7M25-5V7M44-5V7M63-5V7M82-5V7" />
        </g>
        <g transform="translate(54 95) rotate(-12)">
          <path d="M-22-18H57V21H-22Z" fill="#FFC857" />
          <path d="m-6-5-7 7 7 7m26-14 7 7-7 7M10-8 4 12" fill="none" />
        </g>
        <path
          d="M471 47V70M460 58H483M49 232V252M39 242H59"
          fill="none"
          strokeWidth="4"
        />
        <path
          d="m451 369 9-18 9 18 20 3-15 13 4 20-18-10-18 10 4-20-15-13Z"
          fill="#FFC857"
        />
        <circle cx="284" cy="359" r="8" fill="#FF857A" />
      </g>
      <text
        x="278"
        y="390"
        fill="#202020"
        fontFamily="monospace"
        fontSize="12"
        transform="rotate(4 278 390)"
      >
        stay curious_
      </text>
    </svg>
  );
}
