const { createApp } = Vue

createApp({
    data() {
        return {
            products: [
                {
                    id: 1,
                    name: 'Нежные пионы',
                    price: 3999,
                    image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=500',
                    description: 'Букет из 15 нежно-розовых пионов'
                },
                {
                    id: 2,
                    name: 'Красные розы',
                    price: 4999,
                    image: 'https://images.unsplash.com/photo-1494972308805-463bc619d34e?auto=format&fit=crop&w=500',
                    description: 'Классический букет из 25 красных роз'
                },
                {
                    id: 3,
                    name: 'Весенние тюльпаны',
                    price: 2499,
                    image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=500',
                    description: 'Яркий букет из 21 разноцветного тюльпана'
                },
                {
                    id: 4,
                    name: 'Полевые цветы',
                    price: 2999,
                    image: 'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?auto=format&fit=crop&w=500',
                    description: 'Букет в стиле рустик из полевых цветов'
                },
                {
                    id: 5,
                    name: 'Белые лилии',
                    price: 3599,
                    image: 'https://images.unsplash.com/photo-1577090727079-a854293d7cd6?auto=format&fit=crop&w=500',
                    description: 'Элегантный букет из белых лилий'
                },
                {
                    id: 6,
                    name: 'Микс гербер',
                    price: 2799,
                    image: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=500',
                    description: 'Яркий букет из разноцветных гербер'
                },
                {
                    id: 7,
                    name: 'Розовые хризантемы',
                    price: 2299,
                    image: 'https://images.unsplash.com/photo-1509719662282-b82bed65a96b?auto=format&fit=crop&w=500',
                    description: 'Нежный букет из розовых хризантем'
                },
                {
                    id: 8,
                    name: 'Букет невесты',
                    price: 5999,
                    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=500',
                    description: 'Элегантный свадебный букет из белых роз и пионов'
                },
                {
                    id: 9,
                    name: 'Подсолнухи',
                    price: 2499,
                    image: 'https://images.unsplash.com/photo-1470509037663-253afd7f0f51?auto=format&fit=crop&w=500',
                    description: 'Яркий букет из солнечных подсолнухов'
                },
                {
                    id: 10,
                    name: 'Сборный букет',
                    price: 3299,
                    image: 'https://images.unsplash.com/photo-1591886960571-74d43a9d4166?auto=format&fit=crop&w=500',
                    description: 'Красочный микс из сезонных цветов'
                },
                {
                    id: 11,
                    name: 'Оранжевые розы',
                    price: 3799,
                    image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=500',
                    description: 'Букет из 19 оранжевых роз'
                },
                {
                    id: 12,
                    name: 'Альстромерии',
                    price: 2699,
                    image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=500',
                    description: 'Нежный букет из разноцветных альстромерий'
                }
            ],
            cart: [],
            cartModal: null,
            productModal: null,
            checkoutModal: null,
            selectedProduct: null,
            quantity: 1,
            selectedAddons: [],
            addons: [
                { id: 1, name: 'Открытка', price: 150 },
                { id: 2, name: 'Ваза', price: 990 },
                { id: 3, name: 'Коробка конфет', price: 750 },
                { id: 4, name: 'Мягкая игрушка', price: 990 }
            ],
            order: {
                name: '',
                phone: '',
                address: '',
                date: '',
                time: '',
                comment: ''
            },
            deliveryTimes: [
                '10:00 - 12:00',
                '12:00 - 14:00',
                '14:00 - 16:00',
                '16:00 - 18:00',
                '18:00 - 20:00'
            ],
            categories: [
                'Все букеты',
                'Розы',
                'Пионы',
                'Тюльпаны',
                'Полевые цветы',
                'Лилии'
            ],
            selectedCategory: 'Все букеты',
            reviews: [
                {
                    id: 1,
                    name: 'Анна',
                    text: 'Прекрасные букеты! Заказывала на день рождения мамы, она была в восторге.',
                    rating: 5,
                    date: '2024-02-15'
                },
                {
                    id: 2,
                    name: 'Михаил',
                    text: 'Быстрая доставка, свежие цветы. Рекомендую!',
                    rating: 5,
                    date: '2024-02-10'
                },
                {
                    id: 3,
                    name: 'Елена',
                    text: 'Отличный сервис и качество цветов.',
                    rating: 4,
                    date: '2024-02-05'
                }
            ]
        }
    },
    computed: {
        cartItemsCount() {
            return this.cart.reduce((total, item) => total + (item.quantity || 1), 0)
        },
        cartTotal() {
            return this.cart.reduce((total, item) => {
                const addonsTotal = (item.addons || []).reduce((sum, addon) => sum + addon.price, 0)
                return total + (item.price * (item.quantity || 1)) + addonsTotal
            }, 0)
        },
        totalPrice() {
            if (!this.selectedProduct) return 0
            const addonsTotal = this.selectedAddons.reduce((sum, addon) => sum + addon.price, 0)
            return (this.selectedProduct.price * this.quantity) + addonsTotal
        },
        filteredProducts() {
            if (this.selectedCategory === 'Все букеты') {
                return this.products;
            }
            return this.products.filter(product => 
                product.name.toLowerCase().includes(this.selectedCategory.toLowerCase())
            );
        }
    },
    methods: {
        showProductModal(product) {
            this.selectedProduct = {...product}  // Создаем копию объекта
            this.quantity = 1
            this.selectedAddons = []
            this.productModal.show()
        },
        increaseQuantity() {
            this.quantity++
        },
        decreaseQuantity() {
            if (this.quantity > 1) this.quantity--
        },
        addToCartWithOptions() {
            this.cart.push({
                ...this.selectedProduct,
                quantity: this.quantity,
                addons: [...this.selectedAddons]
            })
            this.productModal.hide()
            this.showToast(`${this.selectedProduct.name} добавлен в корзину`)
        },
        showCart() {
            this.cartModal.show()
        },
        removeFromCart(item) {
            const index = this.cart.indexOf(item)
            if (index > -1) {
                this.cart.splice(index, 1)
            }
        },
        showCheckout() {
            this.cartModal.hide()
            this.checkoutModal.show()
        },
        submitOrder() {
            // Проверка заполнения обязательных полей
            if (!this.order.name || !this.order.phone || !this.order.address || !this.order.date || !this.order.time) {
                alert('Пожалуйста, заполните все обязательные поля');
                return;
            }

            // Здесь можно добавить отправку данных на сервер
            const orderData = {
                ...this.order,
                items: this.cart,
                total: this.cartTotal,
                orderDate: new Date().toISOString()
            };

            console.log('Отправка заказа:', orderData);

            // Показываем уведомление об успешном заказе
            this.showToast('Спасибо за заказ! Мы свяжемся с вами в ближайшее время.');

            // Очищаем корзину и форму
            this.cart = [];
            this.order = {
                name: '',
                phone: '',
                address: '',
                date: '',
                time: '',
                comment: ''
            };

            // Закрываем модальное окно
            this.checkoutModal.hide();
        },
        showToast(message) {
            // Создаем элемент уведомления
            const toast = document.createElement('div');
            toast.className = 'custom-toast';
            toast.innerHTML = `
                <div class="toast-content">
                    <i class="fas fa-check-circle"></i>
                    <span>${message}</span>
                </div>
            `;
            document.body.appendChild(toast);

            // Анимация появления
            setTimeout(() => toast.classList.add('show'), 100);

            // Удаление через 3 секунды
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => toast.remove(), 300);
            }, 3000);
        }
    },
    mounted() {
        this.cartModal = new bootstrap.Modal(document.getElementById('cartModal'))
        this.productModal = new bootstrap.Modal(document.getElementById('productModal'))
        this.checkoutModal = new bootstrap.Modal(document.getElementById('checkoutModal'))
        
        // Плавная прокрутка
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault()
                const href = this.getAttribute('href')
                if (href !== '#') {
                    document.querySelector(href).scrollIntoView({
                        behavior: 'smooth'
                    })
                }
            })
        })

        // Анимация появления элементов при скролле
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.product-card, .about-content, .contact-info').forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    }
}).mount('#app') 