import { Fragment } from "react"

type Props = {
	items: any[];
	item: (item: any, index: number) => JSX.Element
}

const Looper: React.FC<Props> = ({ items, item }) => (
	<Fragment>
		{items.map((a, b) => item(a, b))}
	</Fragment>
)

export default Looper