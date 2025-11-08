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
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

export default function CategoriesPage() {
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<any>(null)

  const categories = [
    { id: 1, name: "Thời trang", productCount: 125, description: "Quần áo và trang phục" },
    { id: 2, name: "Giày dép", productCount: 45, description: "Giày thể thao và chính hãng" },
    { id: 3, name: "Phụ kiện", productCount: 78, description: "Túi xách, đồng hồ, trang sức" },
    { id: 4, name: "Điện tử", productCount: 32, description: "Thiết bị điện tử tiêu dùng" },
    { id: 5, name: "Gia dụng", productCount: 56, description: "Đồ dùng nhà bếp và sinh hoạt" },
  ]

  const handleAdd = () => {
    toast.success("Đã thêm danh mục mới thành công!")
    setIsAddOpen(false)
  }

  const handleEdit = () => {
    toast.success("Đã cập nhật danh mục thành công!")
    setIsEditOpen(false)
  }

  const handleDelete = () => {
    toast.success("Đã xóa danh mục thành công!")
    setIsDeleteOpen(false)
  }

  const openEdit = (category: any) => {
    setSelectedCategory(category)
    setIsEditOpen(true)
  }

  const openDelete = (category: any) => {
    setSelectedCategory(category)
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
                  <h1 className="text-2xl font-bold">Quản lý danh mục</h1>
                  <p className="text-muted-foreground">Tổ chức và quản lý các danh mục sản phẩm</p>
                </div>
                <Button className="gap-2" onClick={() => setIsAddOpen(true)}>
                  <IconPlus className="size-4" />
                  Thêm danh mục
                </Button>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader className="pb-3">
                    <CardDescription>Tổng danh mục</CardDescription>
                    <CardTitle className="text-4xl">12</CardTitle>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardDescription>Danh mục hoạt động</CardDescription>
                    <CardTitle className="text-4xl">12</CardTitle>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardDescription>Tổng sản phẩm</CardDescription>
                    <CardTitle className="text-4xl">336</CardTitle>
                  </CardHeader>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Danh sách danh mục</CardTitle>
                  <CardDescription>Xem và quản lý tất cả danh mục</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Tên danh mục</TableHead>
                        <TableHead>Mô tả</TableHead>
                        <TableHead>Số sản phẩm</TableHead>
                        <TableHead className="text-right">Thao tác</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {categories.map((category) => (
                        <TableRow key={category.id}>
                          <TableCell className="font-medium">#{category.id}</TableCell>
                          <TableCell className="font-semibold">{category.name}</TableCell>
                          <TableCell className="text-muted-foreground">{category.description}</TableCell>
                          <TableCell>{category.productCount} sản phẩm</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="sm" onClick={() => openEdit(category)}>
                                <IconPencil className="size-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => openDelete(category)}>
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
            <DialogTitle>Thêm danh mục mới</DialogTitle>
            <DialogDescription>Điền thông tin để tạo danh mục mới</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Tên danh mục</Label>
              <Input id="name" placeholder="Nhập tên danh mục" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Mô tả</Label>
              <Textarea id="description" placeholder="Nhập mô tả danh mục" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddOpen(false)}>
              Hủy
            </Button>
            <Button onClick={handleAdd}>Thêm danh mục</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chỉnh sửa danh mục</DialogTitle>
            <DialogDescription>Cập nhật thông tin danh mục</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Tên danh mục</Label>
              <Input id="edit-name" defaultValue={selectedCategory?.name} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Mô tả</Label>
              <Textarea id="edit-description" defaultValue={selectedCategory?.description} />
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
            <DialogTitle>Xác nhận xóa danh mục</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa danh mục "{selectedCategory?.name}"? Tất cả sản phẩm trong danh mục này sẽ không
              có danh mục.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
              Hủy
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Xóa danh mục
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  )
}
