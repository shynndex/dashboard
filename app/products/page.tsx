"use client"

import type React from "react"
import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { IconPlus, IconPencil, IconTrash } from "@tabler/icons-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

export default function ProductsPage() {
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)

  const products = [
    { id: 1, name: "Áo thun nam", category: "Thời trang", price: "299,000₫", stock: 150, status: "Còn hàng" },
    { id: 2, name: "Quần jean nữ", category: "Thời trang", price: "599,000₫", stock: 80, status: "Còn hàng" },
    { id: 3, name: "Giày thể thao", category: "Giày dép", price: "1,299,000₫", stock: 45, status: "Còn hàng" },
    { id: 4, name: "Túi xách da", category: "Phụ kiện", price: "899,000₫", stock: 0, status: "Hết hàng" },
    { id: 5, name: "Đồng hồ nam", category: "Phụ kiện", price: "2,499,000₫", stock: 25, status: "Còn hàng" },
  ]

  const handleAdd = () => {
    toast.success("Đã thêm sản phẩm mới thành công!")
    setIsAddOpen(false)
  }

  const handleEdit = () => {
    toast.success("Đã cập nhật sản phẩm thành công!")
    setIsEditOpen(false)
  }

  const handleDelete = () => {
    toast.success("Đã xóa sản phẩm thành công!")
    setIsDeleteOpen(false)
  }

  const openEdit = (product: any) => {
    setSelectedProduct(product)
    setIsEditOpen(true)
  }

  const openDelete = (product: any) => {
    setSelectedProduct(product)
    setIsDeleteOpen(true)
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 px-4 md:gap-6 md:py-6 lg:px-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold">Quản lý sản phẩm</h1>
                  <p className="text-muted-foreground">Quản lý và theo dõi tất cả sản phẩm trong cửa hàng</p>
                </div>
                <Button className="gap-2" onClick={() => setIsAddOpen(true)}>
                  <IconPlus className="size-4" />
                  Thêm sản phẩm
                </Button>
              </div>

              <div className="grid gap-4 md:grid-cols-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardDescription>Tổng sản phẩm</CardDescription>
                    <CardTitle className="text-4xl">248</CardTitle>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardDescription>Còn hàng</CardDescription>
                    <CardTitle className="text-4xl">215</CardTitle>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardDescription>Hết hàng</CardDescription>
                    <CardTitle className="text-4xl">33</CardTitle>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardDescription>Giá trị tồn kho</CardDescription>
                    <CardTitle className="text-4xl">₫85M</CardTitle>
                  </CardHeader>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Danh sách sản phẩm</CardTitle>
                  <CardDescription>Xem và quản lý tất cả sản phẩm</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Tên sản phẩm</TableHead>
                        <TableHead>Danh mục</TableHead>
                        <TableHead>Giá</TableHead>
                        <TableHead>Tồn kho</TableHead>
                        <TableHead>Trạng thái</TableHead>
                        <TableHead className="text-right">Thao tác</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell className="font-medium">#{product.id}</TableCell>
                          <TableCell>{product.name}</TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>{product.price}</TableCell>
                          <TableCell>{product.stock}</TableCell>
                          <TableCell>
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                product.status === "Còn hàng"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                  : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                              }`}
                            >
                              {product.status}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="sm" onClick={() => openEdit(product)}>
                                <IconPencil className="size-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => openDelete(product)}>
                                <IconTrash className="size-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </SidebarInset>

      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thêm sản phẩm mới</DialogTitle>
            <DialogDescription>Điền thông tin để thêm sản phẩm mới vào cửa hàng</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Tên sản phẩm</Label>
              <Input id="name" placeholder="Nhập tên sản phẩm" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Danh mục</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn danh mục" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fashion">Thời trang</SelectItem>
                  <SelectItem value="shoes">Giày dép</SelectItem>
                  <SelectItem value="accessories">Phụ kiện</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="price">Giá</Label>
              <Input id="price" type="number" placeholder="0" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="stock">Số lượng tồn kho</Label>
              <Input id="stock" type="number" placeholder="0" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddOpen(false)}>
              Hủy
            </Button>
            <Button onClick={handleAdd}>Thêm sản phẩm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chỉnh sửa sản phẩm</DialogTitle>
            <DialogDescription>Cập nhật thông tin sản phẩm</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Tên sản phẩm</Label>
              <Input id="edit-name" defaultValue={selectedProduct?.name} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-category">Danh mục</Label>
              <Select defaultValue={selectedProduct?.category}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Thời trang">Thời trang</SelectItem>
                  <SelectItem value="Giày dép">Giày dép</SelectItem>
                  <SelectItem value="Phụ kiện">Phụ kiện</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-price">Giá</Label>
              <Input id="edit-price" defaultValue={selectedProduct?.price} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-stock">Số lượng tồn kho</Label>
              <Input id="edit-stock" type="number" defaultValue={selectedProduct?.stock} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              Hủy
            </Button>
            <Button onClick={handleEdit}>Lưu thay đổi</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận xóa sản phẩm</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa sản phẩm "{selectedProduct?.name}"? Hành động này không thể hoàn tác.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
              Hủy
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Xóa sản phẩm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  )
}
