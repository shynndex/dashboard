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

export default function DiscountsPage() {
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [selectedDiscount, setSelectedDiscount] = useState<any>(null)

  const discounts = [
    { id: 1, code: "SUMMER2024", discount: "20%", used: 45, limit: 100, expiry: "31/12/2024", status: "Hoạt động" },
    { id: 2, code: "NEWUSER", discount: "15%", used: 128, limit: 200, expiry: "31/12/2024", status: "Hoạt động" },
    { id: 3, code: "FLASH50", discount: "50%", used: 50, limit: 50, expiry: "15/09/2024", status: "Hết hạn" },
    { id: 4, code: "VIP100K", discount: "100,000₫", used: 23, limit: 100, expiry: "31/12/2024", status: "Hoạt động" },
    { id: 5, code: "FREESHIP", discount: "Miễn phí", used: 89, limit: 150, expiry: "31/12/2024", status: "Hoạt động" },
  ]

  const handleAdd = () => {
    toast.success("Đã tạo mã giảm giá mới thành công!")
    setIsAddOpen(false)
  }

  const handleEdit = () => {
    toast.success("Đã cập nhật mã giảm giá thành công!")
    setIsEditOpen(false)
  }

  const handleDelete = () => {
    toast.success("Đã xóa mã giảm giá thành công!")
    setIsDeleteOpen(false)
  }

  const openEdit = (discount: any) => {
    setSelectedDiscount(discount)
    setIsEditOpen(true)
  }

  const openDelete = (discount: any) => {
    setSelectedDiscount(discount)
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
                  <h1 className="text-2xl font-bold">Quản lý mã giảm giá</h1>
                  <p className="text-muted-foreground">Tạo và quản lý các mã khuyến mãi cho khách hàng</p>
                </div>
                <Button className="gap-2" onClick={() => setIsAddOpen(true)}>
                  <IconPlus className="size-4" />
                  Tạo mã giảm giá
                </Button>
              </div>

              <div className="grid gap-4 md:grid-cols-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardDescription>Tổng mã giảm giá</CardDescription>
                    <CardTitle className="text-4xl">35</CardTitle>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardDescription>Đang hoạt động</CardDescription>
                    <CardTitle className="text-4xl">28</CardTitle>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardDescription>Đã sử dụng</CardDescription>
                    <CardTitle className="text-4xl">1,247</CardTitle>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardDescription>Tiết kiệm cho khách</CardDescription>
                    <CardTitle className="text-4xl">₫45M</CardTitle>
                  </CardHeader>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Danh sách mã giảm giá</CardTitle>
                  <CardDescription>Xem và quản lý tất cả mã giảm giá</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Mã giảm giá</TableHead>
                        <TableHead>Giảm giá</TableHead>
                        <TableHead>Đã dùng</TableHead>
                        <TableHead>Giới hạn</TableHead>
                        <TableHead>Hết hạn</TableHead>
                        <TableHead>Trạng thái</TableHead>
                        <TableHead className="text-right">Thao tác</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {discounts.map((discount) => (
                        <TableRow key={discount.id}>
                          <TableCell className="font-medium">#{discount.id}</TableCell>
                          <TableCell className="font-mono font-semibold">{discount.code}</TableCell>
                          <TableCell className="text-primary font-semibold">{discount.discount}</TableCell>
                          <TableCell>{discount.used}</TableCell>
                          <TableCell>{discount.limit}</TableCell>
                          <TableCell>{discount.expiry}</TableCell>
                          <TableCell>
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                discount.status === "Hoạt động"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                  : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
                              }`}
                            >
                              {discount.status}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="sm" onClick={() => openEdit(discount)}>
                                <IconPencil className="size-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => openDelete(discount)}>
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
            <DialogTitle>Tạo mã giảm giá mới</DialogTitle>
            <DialogDescription>Điền thông tin để tạo mã giảm giá mới</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="code">Mã giảm giá</Label>
              <Input id="code" placeholder="VD: SUMMER2024" className="font-mono" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">Loại giảm giá</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn loại" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">Phần trăm (%)</SelectItem>
                  <SelectItem value="fixed">Số tiền cố định (₫)</SelectItem>
                  <SelectItem value="freeship">Miễn phí vận chuyển</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="value">Giá trị</Label>
              <Input id="value" type="number" placeholder="0" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="limit">Giới hạn sử dụng</Label>
              <Input id="limit" type="number" placeholder="100" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="expiry">Ngày hết hạn</Label>
              <Input id="expiry" type="date" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddOpen(false)}>
              Hủy
            </Button>
            <Button onClick={handleAdd}>Tạo mã</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chỉnh sửa mã giảm giá</DialogTitle>
            <DialogDescription>Cập nhật thông tin mã giảm giá</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-code">Mã giảm giá</Label>
              <Input id="edit-code" defaultValue={selectedDiscount?.code} className="font-mono" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-discount">Giá trị giảm</Label>
              <Input id="edit-discount" defaultValue={selectedDiscount?.discount} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-limit">Giới hạn sử dụng</Label>
              <Input id="edit-limit" type="number" defaultValue={selectedDiscount?.limit} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-expiry">Ngày hết hạn</Label>
              <Input id="edit-expiry" type="date" />
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
            <DialogTitle>Xác nhận xóa mã giảm giá</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa mã giảm giá "{selectedDiscount?.code}"? Khách hàng sẽ không thể sử dụng mã này
              nữa.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
              Hủy
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Xóa mã
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  )
}
