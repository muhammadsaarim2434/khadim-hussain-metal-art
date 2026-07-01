import mongoose, { Schema, model, models } from 'mongoose';

/* ----------------------------- Admin ----------------------------- */
const AdminSchema = new Schema(
  {
    firstName: { type: String, default: 'Admin' },
    lastName: { type: String, default: '' },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String, default: '' },
    country: { type: String, default: 'Pakistan' },
    password: { type: String, required: true },
    image: { type: String, default: '' },
  },
  { timestamps: true }
);

/* --------------------------- Category ---------------------------- */
const CategorySchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    image: { type: String, default: '' },
    longImage: { type: String, default: '' },
    description: { type: String, default: '' },
  },
  { timestamps: true }
);

/* ------------------------- Sub Category -------------------------- */
const SubCategorySchema = new Schema(
  {
    title: { type: String, required: true },
    image: { type: String, default: '' },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category' },
  },
  { timestamps: true }
);

/* ----------------------------- Region ---------------------------- */
const RegionSchema = new Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

/* ----------------------------- Product --------------------------- */
const SizeSchema = new Schema(
  { size: String, price: String },
  { _id: false }
);

const ProductSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, default: '' },
    descriptionLong: { type: String, default: '' },
    price: { type: String, default: '' },
    discount: { type: String, default: '0' },
    tax: { type: String, default: '0' },
    feature: { type: Boolean, default: false },
    sale: { type: Boolean, default: false },
    material: { type: String, default: '' },
    finish: { type: String, default: '' },
    features: { type: [String], default: [] },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category' },
    subCategoryId: { type: Schema.Types.ObjectId, ref: 'SubCategory' },
    regionId: { type: Schema.Types.ObjectId, ref: 'Region' },
    images: { type: [String], default: [] },
    sizes: { type: [SizeSchema], default: [] },
  },
  { timestamps: true }
);

/* ----------------------------- Banner ---------------------------- */
const BannerSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: '' },
    image: { type: String, default: '' },
  },
  { timestamps: true }
);

/* ------------------------------ Order ---------------------------- */
const OrderItemSchema = new Schema(
  {
    productId: String,
    title: String,
    quantity: Number,
    price: String,
    totalPrice: Number,
  },
  { _id: false }
);

const OrderSchema = new Schema(
  {
    orderId: { type: String, required: true, unique: true },
    fullName: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    country: String,
    postalCode: String,
    totalProducts: Number,
    totalBill: Number,
    paymentStatus: { type: Number, default: 0 }, // 0 unpaid, 1 paid
    items: { type: [OrderItemSchema], default: [] },
  },
  { timestamps: true }
);

/* ---------------------------- Settings --------------------------- */
const SettingsSchema = new Schema(
  {
    key: { type: String, required: true, unique: true },
    logo: { type: String, default: '' },
  },
  { timestamps: true }
);

export const Admin = models.Admin || model('Admin', AdminSchema);
export const Category = models.Category || model('Category', CategorySchema);
export const SubCategory =
  models.SubCategory || model('SubCategory', SubCategorySchema);
export const Region = models.Region || model('Region', RegionSchema);
export const Product = models.Product || model('Product', ProductSchema);
export const Banner = models.Banner || model('Banner', BannerSchema);
export const Order = models.Order || model('Order', OrderSchema);
export const Settings = models.Settings || model('Settings', SettingsSchema);

export type { mongoose };
