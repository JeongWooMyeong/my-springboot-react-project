export default function ProductTable({
                                         results,
                                         selected,
                                         allSelected,
                                         onToggleSelect,
                                         onToggleSelectAll
                                     }) {

    return (
        <table
            style={{
                width: "100%",
                borderCollapse: "collapse"
            }}
        >

            <thead>
            <tr>
                <th>
                    <input
                        type="checkbox"
                        checked={allSelected}
                        onChange={onToggleSelectAll}
                    />
                </th>

                <th>상품코드</th>
                <th>상품명</th>
                <th>가격</th>
                <th>재고</th>
            </tr>
            </thead>

            <tbody>

            {results.map(product => (

                <tr key={product.productId}>

                    <td>
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

                    <td>
                        {product.productId}
                    </td>

                    <td>
                        {product.productName}
                    </td>

                    <td>
                        {product.price}
                    </td>

                    <td>
                        {product.stock}
                    </td>

                </tr>

            ))}

            </tbody>

        </table>
    );
}