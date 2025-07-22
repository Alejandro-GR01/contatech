import type { Operation } from "../types"

const IconType = ({ type, classStyles }: { type: Operation["type"] , classStyles? : string }) => (
  <img
    src={`icon_${type}.svg`}
    alt="icon-type"
    className={`w-8 h-8 md:w-12 md:h-12 border-2 rounded-full border-gray-500 ${classStyles}  `}
  />
)

export default IconType