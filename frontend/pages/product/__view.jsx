import Filter from '../../components/Filter'
import CardProduct from '../../components/Card'

function ProductView(props) {
	return (
		<>
			<Filter handler={props.handleClickFilter} />
			<CardProduct {...props} />
		</>
	)
}

export default ProductView
