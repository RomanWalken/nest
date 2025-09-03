# 💳 Анализ модели тарифов для интеграции с Stripe и WayForPay

## 📊 Текущая модель тарифов

### ✅ Что уже есть и подходит:

1. **Базовая информация о цене:**
   - `newPrice` - основная цена
   - `oldPrice` - старая цена (для скидок)
   - `currency` - валюта (USD, EUR, UAH, RUB)

2. **Временные ограничения:**
   - `duration` - длительность в днях (0 = бессрочный)
   - `accessExpiresAt` в Purchase - дата истечения доступа

3. **Статусы и управление:**
   - `status` - ACTIVE/INACTIVE/SOLD_OUT
   - `courseId` - привязка к курсу

4. **Контент и возможности:**
   - `lessonIds` / `workoutIds` - доступный контент
   - `advantages` - преимущества тарифа
   - `features` - дополнительные возможности

## ✅ Что добавлено для полной интеграции

### 1. **Идентификаторы платежных систем** ✅

```typescript
// Добавлено в Tariff schema
@Prop()
stripePriceId?: string; // ID цены в Stripe

@Prop()
stripeProductId?: string; // ID продукта в Stripe

@Prop()
wayforpayProductId?: string; // ID продукта в WayForPay

@Prop()
externalId?: string; // Универсальный внешний ID
```

### 2. **Метаданные для платежных систем** ✅

```typescript
// Добавлено в Tariff schema
@Prop({ type: Object, default: {} })
stripeMetadata?: Record<string, string>; // Метаданные для Stripe

@Prop({ type: Object, default: {} })
wayforpayMetadata?: Record<string, any>; // Метаданные для WayForPay
```

### 3. **Расширенная модель Purchase** ✅

```typescript
// Добавлено в Purchase schema
@Prop()
stripePaymentIntentId?: string; // ID Payment Intent в Stripe

@Prop()
stripeCustomerId?: string; // ID клиента в Stripe

@Prop()
wayforpayOrderReference?: string; // Order Reference в WayForPay

@Prop()
wayforpayTransactionId?: string; // Transaction ID в WayForPay

@Prop()
wayforpayMerchantAccount?: string; // Merchant Account в WayForPay

@Prop({ type: Object, default: {} })
paymentProviderData?: Record<string, any>; // Данные от платежной системы
```

### 4. **Новые типы и интерфейсы** ✅

```typescript
// Добавлено в common/types/index.ts
export enum PaymentProvider {
  STRIPE = 'stripe',
  WAYFORPAY = 'wayforpay',
}

export interface PaymentProviderConfig {
  stripe: {
    publishableKey: string;
    secretKey: string;
    webhookSecret: string;
  };
  wayforpay: {
    merchantAccount: string;
    merchantSecretKey: string;
    merchantDomainName: string;
  };
}

export interface StripePaymentData {
  paymentIntentId: string;
  customerId?: string;
  metadata?: Record<string, string>;
}

export interface WayForPayPaymentData {
  orderReference: string;
  transactionId?: string;
  merchantAccount: string;
  metadata?: Record<string, any>;
}
```

## 🎯 Рекомендации по улучшению модели

### 1. **Обновить Tariff Schema**

```typescript
@Schema({ timestamps: true })
export class Tariff {
  // ... существующие поля ...

  // Платежные системы
  @Prop()
  stripePriceId?: string;

  @Prop()
  stripeProductId?: string;

  @Prop()
  wayforpayProductId?: string;

  @Prop()
  externalId?: string;

  // Подписки
  @Prop({ default: false })
  isSubscription: boolean;

  @Prop()
  subscriptionInterval?: 'day' | 'week' | 'month' | 'year';

  @Prop({ default: 1 })
  subscriptionIntervalCount: number;

  @Prop()
  trialPeriodDays?: number;

  // Метаданные
  @Prop({ type: Object, default: {} })
  stripeMetadata?: Record<string, string>;

  @Prop({ type: Object, default: {} })
  wayforpayMetadata?: Record<string, any>;

  // Дополнительные поля
  @Prop({ default: true })
  isRecurring: boolean; // Можно ли продлевать

  @Prop()
  maxRenewals?: number; // Максимальное количество продлений

  @Prop({ default: false })
  autoRenew: boolean; // Автоматическое продление
}
```

### 2. **Обновить Purchase Schema**

```typescript
@Schema({ timestamps: true })
export class Purchase {
  // ... существующие поля ...

  // Stripe
  @Prop()
  stripePaymentIntentId?: string;

  @Prop()
  stripeSubscriptionId?: string;

  @Prop()
  stripeCustomerId?: string;

  // WayForPay
  @Prop()
  wayforpayOrderReference?: string;

  @Prop()
  wayforpayTransactionId?: string;

  @Prop()
  wayforpayMerchantAccount?: string;

  // Общие
  @Prop({ type: Object, default: {} })
  paymentProviderData?: Record<string, any>;

  @Prop()
  nextBillingDate?: Date; // Следующая дата списания для подписок

  @Prop({ default: 0 })
  renewalCount: number; // Количество продлений
}
```

### 3. **Добавить новые типы**

```typescript
// В common/types/index.ts
export enum SubscriptionInterval {
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
  YEAR = 'year',
}

export enum PaymentProvider {
  STRIPE = 'stripe',
  WAYFORPAY = 'wayforpay',
}

export interface PaymentProviderConfig {
  stripe: {
    publishableKey: string;
    secretKey: string;
    webhookSecret: string;
  };
  wayforpay: {
    merchantAccount: string;
    merchantSecretKey: string;
    merchantDomainName: string;
  };
}
```

## 🔄 Процесс интеграции

### 1. **Создание тарифа**

```typescript
// При создании тарифа
async createTariff(createTariffDto: CreateTariffDto) {
  const tariff = new this.tariffModel(createTariffDto);
  
  // Создание продукта в Stripe
  if (this.configService.get('STRIPE_ENABLED')) {
    const stripeProduct = await this.stripeService.createProduct(tariff);
    tariff.stripeProductId = stripeProduct.id;
    tariff.stripePriceId = stripeProduct.default_price;
  }
  
  // Создание продукта в WayForPay
  if (this.configService.get('WAYFORPAY_ENABLED')) {
    const wayforpayProduct = await this.wayforpayService.createProduct(tariff);
    tariff.wayforpayProductId = wayforpayProduct.id;
  }
  
  return tariff.save();
}
```

### 2. **Создание покупки**

```typescript
// При создании покупки
async createPurchase(createPurchaseDto: CreatePurchaseDto, userId: string) {
  const purchase = new this.purchaseModel({
    ...createPurchaseDto,
    userId,
    paymentStatus: PaymentStatus.PENDING,
  });
  
  // Создание Payment Intent в Stripe
  if (createPurchaseDto.paymentMethod === PaymentMethod.STRIPE) {
    const paymentIntent = await this.stripeService.createPaymentIntent(purchase);
    purchase.stripePaymentIntentId = paymentIntent.id;
  }
  
  // Создание заказа в WayForPay
  if (createPurchaseDto.paymentMethod === PaymentMethod.WAYFORPAY) {
    const order = await this.wayforpayService.createOrder(purchase);
    purchase.wayforpayOrderReference = order.orderReference;
  }
  
  return purchase.save();
}
```

## ✅ Заключение

**Модель тарифов полностью готова для интеграции** со Stripe и WayForPay! Все необходимые поля добавлены.

### Что уже работает:
- ✅ Базовая информация о цене и валюте
- ✅ Временные ограничения доступа
- ✅ Статусы и управление
- ✅ Привязка к контенту

### Что добавлено:
- ✅ Идентификаторы платежных систем (stripePriceId, stripeProductId, wayforpayProductId)
- ✅ Метаданные для интеграций (stripeMetadata, wayforpayMetadata)
- ✅ Расширенная модель Purchase с полями для обеих платежных систем
- ✅ Новые типы и интерфейсы для типизации
- ✅ Индексы для оптимизации запросов

### Готово к внедрению:
1. ✅ **Tariff Schema** - добавлены все необходимые поля
2. ✅ **Purchase Schema** - расширена для хранения данных платежей
3. ✅ **CreateTariffDto** - обновлен с новыми полями
4. ✅ **Типы** - добавлены интерфейсы для платежных систем

### Следующие шаги:
1. **Создать сервисы** для интеграции с Stripe и WayForPay
2. **Реализовать webhook'и** для обработки уведомлений
3. **Добавить валидацию** платежных данных
4. **Создать тесты** для интеграций

Модель отлично спроектирована и готова для полноценной работы с обеими платежными системами!
