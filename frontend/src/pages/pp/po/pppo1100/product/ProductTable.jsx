export default function ProductTable({
                                         results,
                                         selected,
                                         allSelected,
                                         onToggleSelect,
                                         onToggleSelectAll
                                     }) {

    return (
        <div className="product-table-wrapper">

            <table className="product-table">

                <thead>
                <tr>

                    <th className="checkbox-column">
                        <input
                            type="checkbox"
                            checked={allSelected}
                            onChange={onToggleSelectAll}
                        />
                    </th>

                    <th className="product-code-column">
                        상품코드
                    </th>

                    <th className="product-name-column">
                        상품명
                    </th>

                    <th className="price-column">
                        가격
                    </th>

                    <th className="stock-column">
                        재고
                    </th>

                </tr>
                </thead>

                <tbody>

                {results.map(product => (

                    <tr key={product.productId}>

                        <td className="checkbox-column">
                            <input
                                type="checkbox"
                                checked={selected.some(
                                    p =>
                                        p.productId ===
                                        product.productId
                                )}
                                onChange={() =>
                                    onToggleSelect(product)
                                }
                            />
                        </td>

                        <td className="product-code-column">
                            {product.productId}
                        </td>

                        <td
                            className="product-name-column"
                            title={product.productName}
                        >
                            {product.productName}
                        </td>

                        <td className="price-column">
                            {product.price?.toLocaleString()}
                        </td>

                        <td className="stock-column">
                            {product.stock?.toLocaleString()}
                        </td>

                    </tr>

                ))}

                </tbody>

            </table>

        </div>
    );
}