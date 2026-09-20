import { useEffect, useState } from 'react';

const initialForm = {
    productCode: '',
    productName: '',
    price: '',
    stock: '',
    version: null,
};

const ProductForm = ({ product, onSubmit, onClose }) => {
    const [form, setForm] = useState(initialForm);

    const isEditMode = Boolean(product);

    useEffect(() => {
        if (product) {
            setForm({
                productCode: product.productCode ?? '',
                productName: product.productName ?? '',
                price: product.price ?? '',
                stock: product.stock ?? '',
                version: product.version ?? null,
            });
        } else {
            setForm(initialForm);
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.productCode.trim()) {
            alert('상품코드를 입력해주세요.');
            return;
        }

        if (!form.productName.trim()) {
            alert('상품명을 입력해주세요.');
            return;
        }

        if (form.price === '' || Number(form.price) < 0) {
            alert('가격을 확인해주세요.');
            return;
        }

        if (form.stock === '' || Number(form.stock) < 0) {
            alert('재고를 확인해주세요.');
            return;
        }

        onSubmit({
            ...form,
            productCode: form.productCode.trim(),
            productName: form.productName.trim(),
            price: Number(form.price),
            stock: Number(form.stock),
            version: Number(form.version)
        });
    };

    return (
        <div className="product-form__overlay">

            <div className="product-form">

                <div className="product-form__header">

                    <h2>
                        {isEditMode ? '상품 수정' : '상품 등록'}
                    </h2>

                    <button
                        type="button"
                        className="product-form__close"
                        onClick={onClose}
                    >
                        ×
                    </button>

                </div>


                <form onSubmit={handleSubmit}>

                    <div className="product-form__body">

                        {/* 상품코드 */}
                        <div className="form-field">

                            <label htmlFor="productCode">
                                상품코드
                            </label>

                            <input
                                id="productCode"
                                name="productCode"
                                type="text"
                                value={form.productCode}
                                placeholder="상품코드를 입력하세요."
                                onChange={handleChange}
                                readOnly={isEditMode}
                            />

                        </div>


                        {/* 상품명 */}
                        <div className="form-field">

                            <label htmlFor="productName">
                                상품명
                            </label>

                            <input
                                id="productName"
                                name="productName"
                                type="text"
                                value={form.productName}
                                placeholder="상품명을 입력하세요."
                                onChange={handleChange}
                            />

                        </div>


                        {/* 가격 */}
                        <div className="form-field">

                            <label htmlFor="price">
                                가격
                            </label>

                            <input
                                id="price"
                                name="price"
                                type="number"
                                min="0"
                                value={form.price}
                                placeholder="가격을 입력하세요."
                                onChange={handleChange}
                            />

                        </div>


                        {/* 재고 */}
                        <div className="form-field">

                            <label htmlFor="stock">
                                재고
                            </label>

                            <input
                                id="stock"
                                name="stock"
                                type="number"
                                min="0"
                                value={form.stock}
                                placeholder="재고를 입력하세요."
                                onChange={handleChange}
                            />

                        </div>

                    </div>


                    <div className="product-form__footer">

                        <button
                            type="button"
                            className="product-form__cancel"
                            onClick={onClose}
                        >
                            취소
                        </button>

                        <button
                            type="submit"
                            className="product-form__submit"
                        >
                            {isEditMode ? '수정' : '등록'}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default ProductForm;
