-- RenameForeignKey
ALTER TABLE "OrderItem" RENAME CONSTRAINT "OrderItem_order_fkey" TO "OrderItem_orderId_fkey";
