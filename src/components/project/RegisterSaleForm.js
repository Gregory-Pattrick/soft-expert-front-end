import { useState, useEffect } from 'react';
import styles from './RegisterSaleForm.module.css';

function RegisterSaleForm({ id, name, productType, price, handleSelectProduct }) {
    const [isBuying, setIsBuying] = useState(false);
    const [quantity, setQuantity] = useState(1);

    const handleCheckboxChange = () => {
        setIsBuying(!isBuying);
    };

    const handleQuantityChange = (e) => {
        setQuantity(e.target.value);
    };

    useEffect(() => {
        handleSelectProduct(id, isBuying, quantity);
    }, [isBuying, quantity, id, handleSelectProduct]);

    const totalTax = productType && productType.product_tax
        ? (
            parseFloat(price) * (parseFloat(productType.product_tax.pis || 0) / 100) +
            parseFloat(price) * (parseFloat(productType.product_tax.confins || 0) / 100) +
            parseFloat(price) * (parseFloat(productType.product_tax.icms || 0) / 100) +
            parseFloat(price) * (parseFloat(productType.product_tax.ipi || 0) / 100)
        ).toFixed(2)
        : 'Não vinculado';

    return (
        <div className={styles.product_card}>
            <h4>{name}</h4>
            <p>
                <span>Preço:</span> R${price}
            </p>
            <p className={styles.type_text}>
                <span>Tipo:</span> {productType ? productType.name : 'Não vinculado'}
            </p>
            <p className={styles.type_text}>
                <span>Impostos:</span> {totalTax}
            </p>
            <p className={styles.type_text}>
                <input
                    type="checkbox"
                    checked={isBuying}
                    onChange={handleCheckboxChange}
                />
                <span>Comprar</span>
            </p>
            {isBuying && (
                <p className={styles.type_text}>
                    <span>
                        Quantidade:
                        <input className={styles.input}
                            type="number"
                            value={quantity}
                            onChange={handleQuantityChange}
                            min="1"
                        />
                    </span>
                </p>
            )}
        </div>
    );
}

export default RegisterSaleForm;
