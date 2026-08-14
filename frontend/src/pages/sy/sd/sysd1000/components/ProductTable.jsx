const ProductTable = ({
                          products,
                          totalElements,
                          onEdit,
                          onDelete,
                      }) => {
    return (
        <div className="product-table">

            <div className="product-table__header">
                <h2>상품 목록</h2>

                <span>
                    총 {totalElements}개
                </span>
            </div>

            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>상품명</th>
                    <th>가격</th>
                    <th>재고</th>
                    <th>등록일</th>
                    <th>관리</th>
                </tr>
                </thead>

                <tbody>
                {products.length === 0 ? (
                    <tr>
                        <td
                            colSpan="6"
                            className="product-table__empty"
                        >
                            등록된 상품이 없습니다.
                        </td>
                    </tr>
                ) : (
                    products.map((product) => (
                        <tr key={product.productId}>

                            <td>
                                {product.productId}
                            </td>

                            <td>
                                {product.productName}
                            </td>

                            <td>
                                {Number(
                                    product.price
                                ).toLocaleString()}
                                원
                            </td>

                            <td>
                                {product.stock}
                            </td>

                            <td>
                                {product.createdAt}
                            </td>

                            <td>
                                <div className="product-table__actions">

                                    <button
                                        type="button"
                                        onClick={() =>
                                            onEdit(product)
                                        }
                                    >
                                        수정
                                    </button>

                                    <button
                                        type="button"
                                        className="delete"
                                        onClick={() =>
                                            onDelete(
                                                product.productId
                                            )
                                        }
                                    >
                                        삭제
                                    </button>

                                </div>
                            </td>

                        </tr>
                    ))
                )}
                </tbody>
            </table>

        </div>
    );
};

export default ProductTable;