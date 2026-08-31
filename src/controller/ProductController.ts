import { Request, Response } from "express";
import { ProductService } from "../service/ProductService";
import { Product } from "../entity/Product";

const productService = new ProductService();

export class ProductController {
  // GET /products
  async index(_req: Request, res: Response): Promise<void> {
    const products = await productService.findAll();
    res.json(products);
  }

  // GET /products/:id
  async show(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    const product = await productService.findById(id);

    if (!product) {
      res.status(404).json({ message: "Produto não encontrado." });
      return;
    }

    res.json(product);
  }

  // POST /products
  async store(req: Request, res: Response): Promise<void> {
    const { name, description, price, quantity } = req.body;

    if (!name) {
      res.status(400).json({ message: "O campo 'name' é obrigatório." });
      return;
    }

    const product = await productService.create({
      name,
      description,
      price,
      quantity,
    });

    res.status(201).json(product);
  }

  // PUT /products/:id
  async update(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    const { name, description, price, quantity } = req.body;

    const data: Partial<Product> = {};
    if (name !== undefined) data.name = name;
    if (description !== undefined) data.description = description;
    if (price !== undefined) data.price = price;
    if (quantity !== undefined) data.quantity = quantity;

    const product = await productService.update(id, data);

    if (!product) {
      res.status(404).json({ message: "Produto não encontrado." });
      return;
    }

    res.json(product);
  }

  // DELETE /products/:id
  async destroy(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    const product = await productService.delete(id);

    if (!product) {
      res.status(404).json({ message: "Produto não encontrado." });
      return;
    }

    res.status(204).send();
  }
}
