import { ElementType } from 'react';
import { Route } from 'react-router-dom'

type Props = {
	path: string,
	exact: boolean,
	layout: ElementType,
	component: ElementType
}

const RouteWrapper: React.FC<Props> = ({
	layout: Layout,
	component: Component,
	...rest
}) => {
	return (
		<Route {...rest} render={(props: any) => (
			<Layout {...props}>
				<Component {...props} />
			</Layout>
		)} />
	);
}

export default RouteWrapper