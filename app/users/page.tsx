"use client"

import type React from "react"
import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { IconPencil, IconTrash } from "@tabler/icons-react"
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

export default function UsersPage() {
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<any>(null)

  const users = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      email: "nguyenvana@email.com",
      orders: 12,
      spent: "15,499,000₫",
      role: "Khách hàng",
      status: "Hoạt động",
    },
    {
      id: 2,
      name: "Trần Thị B",
      email: "tranthib@email.com",
      orders: 8,
      spent: "8,899,000₫",
      role: "Khách hàng",
      status: "Hoạt động",
    },
    {
      id: 3,
      name: "Lê Văn C",
      email: "levanc@email.com",
      orders: 25,
      spent: "32,299,000₫",
      role: "VIP",
      status: "Hoạt động",
    },
    {
      id: 4,
      name: "Phạm Thị D",
      email: "phamthid@email.com",
      orders: 3,
      spent: "2,599,000₫",
      role: "Khách hàng",
      status: "Tạm khóa",
    },
    {
      id: 5,
      name: "Hoàng Văn E",
      email: "hoangvane@email.com",
      orders: 45,
      spent: "68,499,000₫",
      role: "VIP",
      status: "Hoạt động",
    },
  ]

  const handleEdit = () => {
    toast.success("Đã cập nhật người dùng thành công!")
    setIsEditOpen(false)
  }

  const handleDelete = () => {
    toast.success("Đã xóa người dùng thành công!")
    setIsDeleteOpen(false)
  }

  const openEdit = (user: any) => {
    setSelectedUser(user)
    setIsEditOpen(true)
  }

  const openDelete = (user: any) => {
    setSelectedUser(user)
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
              <div>
                <h1 className="text-2xl font-bold">Quản lý người dùng</h1>
                <p className="text-muted-foreground">Quản lý thông tin và hoạt động của khách hàng</p>
              </div>

              <div className="grid gap-4 md:grid-cols-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardDescription>Tổng người dùng</CardDescription>
                    <CardTitle className="text-4xl">2,458</CardTitle>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardDescription>Hoạt động</CardDescription>
                    <CardTitle className="text-4xl">2,341</CardTitle>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardDescription>VIP</CardDescription>
                    <CardTitle className="text-4xl">156</CardTitle>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardDescription>Mới tháng này</CardDescription>
                    <CardTitle className="text-4xl">+234</CardTitle>
                  </CardHeader>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Danh sách người dùng</CardTitle>
                  <CardDescription>Xem và quản lý tất cả người dùng</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Tên</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Đơn hàng</TableHead>
                        <TableHead>Chi tiêu</TableHead>
                        <TableHead>Vai trò</TableHead>
                        <TableHead>Trạng thái</TableHead>
                        <TableHead className="text-right">Thao tác</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">#{user.id}</TableCell>
                          <TableCell className="font-semibold">{user.name}</TableCell>
                          <TableCell className="text-muted-foreground">{user.email}</TableCell>
                          <TableCell>{user.orders}</TableCell>
                          <TableCell className="font-semibold">{user.spent}</TableCell>
                          <TableCell>
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                user.role === "VIP"
                                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                                  : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
                              }`}
                            >
                              {user.role}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                user.status === "Hoạt động"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                  : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                              }`}
                            >
                              {user.status}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="sm" onClick={() => openEdit(user)}>
                                <IconPencil className="size-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => openDelete(user)}>
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

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chỉnh sửa người dùng</DialogTitle>
            <DialogDescription>Cập nhật thông tin người dùng</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Tên người dùng</Label>
              <Input id="edit-name" defaultValue={selectedUser?.name} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-email">Email</Label>
              <Input id="edit-email" type="email" defaultValue={selectedUser?.email} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-role">Vai trò</Label>
              <Select defaultValue={selectedUser?.role}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Khách hàng">Khách hàng</SelectItem>
                  <SelectItem value="VIP">VIP</SelectItem>
                  <SelectItem value="Admin">Quản trị viên</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-status">Trạng thái</Label>
              <Select defaultValue={selectedUser?.status}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Hoạt động">Hoạt động</SelectItem>
                  <SelectItem value="Tạm khóa">Tạm khóa</SelectItem>
                </SelectContent>
              </Select>
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
            <DialogTitle>Xác nhận xóa người dùng</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa người dùng "{selectedUser?.name}"? Tất cả dữ liệu liên quan sẽ bị xóa và không
              thể khôi phục.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
              Hủy
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Xóa người dùng
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  )
}
