import { useEffect, useState } from 'react';

const initialForm = {
    productName: '',
    price: '',
    stock: '',
};

const ProductForm = ({ product, onSubmit, onClose }) => {
    const [form, setForm] = useState(initialForm);

    const isEditMode = Boolean(product);

    useEffect(() => {
        if (product) {
            setForm({
                productName: product.productName ?? '',
                price: product.price ?? '',
                stock: product.stock ?? '',
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
            price: Number(form.price),
            stock: Number(form.stock),
        });
    };

    return (
        <div className="product-form__overlay">
            <div className="product-form">
                <div className="product-form__header">
                    <h2>{isEditMode ? '상품 수정' : '상품 등록'}</h2>

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