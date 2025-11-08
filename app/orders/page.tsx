"use client"

import type React from "react"
import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { IconEye, IconCheck, IconX } from "@tabler/icons-react"
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
import { toast } from "sonner"
import { Label } from "@/components/ui/label"

export default function OrdersPage() {
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [isCancelOpen, setIsCancelOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<any>(null)

  const orders = [
    { id: 1, customer: "Nguyễn Văn A", total: "1,499,000₫", items: 3, date: "15/11/2024", status: "Đã giao" },
    { id: 2, customer: "Trần Thị B", total: "899,000₫", items: 2, date: "15/11/2024", status: "Đang giao" },
    { id: 3, customer: "Lê Văn C", total: "2,299,000₫", items: 5, date: "14/11/2024", status: "Đang xử lý" },
    { id: 4, customer: "Phạm Thị D", total: "599,000₫", items: 1, date: "14/11/2024", status: "Đã hủy" },
    { id: 5, customer: "Hoàng Văn E", total: "3,499,000₫", items: 7, date: "13/11/2024", status: "Đã giao" },
  ]

  const handleConfirm = () => {
    toast.success("Đã xác nhận đơn hàng thành công!")
    setIsConfirmOpen(false)
  }

  const handleCancel = () => {
    toast.success("Đã hủy đơn hàng thành công!")
    setIsCancelOpen(false)
  }

  const openView = (order: any) => {
    setSelectedOrder(order)
    setIsViewOpen(true)
  }

  const openConfirm = (order: any) => {
    setSelectedOrder(order)
    setIsConfirmOpen(true)
  }

  const openCancel = (order: any) => {
    setSelectedOrder(order)
    setIsCancelOpen(true)
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
                  <h1 className="text-2xl font-bold">Quản lý đơn hàng</h1>
                  <p className="text-muted-foreground">Theo dõi và xử lý tất cả đơn hàng</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardDescription>Tổng đơn hàng</CardDescription>
                    <CardTitle className="text-4xl">1,248</CardTitle>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardDescription>Đang xử lý</CardDescription>
                    <CardTitle className="text-4xl">45</CardTitle>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardDescription>Đã giao</CardDescription>
                    <CardTitle className="text-4xl">1,156</CardTitle>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardDescription>Doanh thu tháng này</CardDescription>
                    <CardTitle className="text-4xl">₫125M</CardTitle>
                  </CardHeader>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Danh sách đơn hàng</CardTitle>
                  <CardDescription>Xem và quản lý tất cả đơn hàng</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Mã đơn</TableHead>
                        <TableHead>Khách hàng</TableHead>
                        <TableHead>Tổng tiền</TableHead>
                        <TableHead>Số sản phẩm</TableHead>
                        <TableHead>Ngày đặt</TableHead>
                        <TableHead>Trạng thái</TableHead>
                        <TableHead className="text-right">Thao tác</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">#{order.id}</TableCell>
                          <TableCell>{order.customer}</TableCell>
                          <TableCell className="font-semibold">{order.total}</TableCell>
                          <TableCell>{order.items} sản phẩm</TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell>
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                order.status === "Đã giao"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                  : order.status === "Đang giao"
                                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                                    : order.status === "Đang xử lý"
                                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                                      : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                              }`}
                            >
                              {order.status}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="sm" onClick={() => openView(order)}>
                                <IconEye className="size-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => openConfirm(order)}>
                                <IconCheck className="size-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => openCancel(order)}>
                                <IconX className="size-4" />
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

      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chi tiết đơn hàng #{selectedOrder?.id}</DialogTitle>
            <DialogDescription>Thông tin chi tiết về đơn hàng</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Khách hàng</Label>
                <p className="mt-1 font-semibold">{selectedOrder?.customer}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Ngày đặt</Label>
                <p className="mt-1">{selectedOrder?.date}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Số sản phẩm</Label>
                <p className="mt-1">{selectedOrder?.items} sản phẩm</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Tổng tiền</Label>
                <p className="mt-1 font-semibold text-lg">{selectedOrder?.total}</p>
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium text-muted-foreground">Trạng thái</Label>
              <p className="mt-1">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    selectedOrder?.status === "Đã giao"
                      ? "bg-green-100 text-green-800"
                      : selectedOrder?.status === "Đang giao"
                        ? "bg-blue-100 text-blue-800"
                        : selectedOrder?.status === "Đang xử lý"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                  }`}
                >
                  {selectedOrder?.status}
                </span>
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsViewOpen(false)}>Đóng</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận đơn hàng</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xác nhận đơn hàng #{selectedOrder?.id} của khách hàng {selectedOrder?.customer}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsConfirmOpen(false)}>
              Hủy
            </Button>
            <Button onClick={handleConfirm}>Xác nhận</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isCancelOpen} onOpenChange={setIsCancelOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hủy đơn hàng</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn hủy đơn hàng #{selectedOrder?.id}? Hành động này không thể hoàn tác.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCancelOpen(false)}>
              Không
            </Button>
            <Button variant="destructive" onClick={handleCancel}>
              Hủy đơn hàng
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  )
}
