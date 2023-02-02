#!/usr/bin/python3

from models.product import Product

product_dict = {
    "name": "Painter",
    "owner_id": "07a5fec0-aa7f-4929-ab5a-37f10655fa92",
    "category_id": "70ff042c-db94-485f-91e2-971afc70369f"
}
model = Product(**product_dict)
model.save()
print(model.to_dict())
