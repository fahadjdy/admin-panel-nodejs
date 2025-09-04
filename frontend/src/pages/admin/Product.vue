<template>
  <div>
    <!-- 🔍 Filters -->
     <fieldset class="border border-gray-300 rounded-md p-4">
        <legend class="text-lg px-2"><i class="fas fa-filter"></i> Filter By :</legend>
        <div class="row mb-3">
            <div class="col-md-3">
            <label for="category">Category:</label>
            <div class="input-group">
                <span class="input-group-text">
                    <i class="fas fa-layer-group"></i>
                </span>
                <select
                v-model="filters.category_id"
                class="form-select"
                @change="reloadTable"
                >
                <option value="">All Categories</option>
                <option value="1">Cars</option>
                <option value="2">Bikes</option>
                <option value="3">Trucks</option>
                </select>
            </div>
            </div>

            <div class="col-md-3">
            <label for="status">Status:</label>
            <div class="input-group">
                <span class="input-group-text">
                    <i class="fas fa-toggle-on"></i>
                </span>
                <select
                v-model="filters.status"
                class="form-select"
                @change="reloadTable"
                >
                <option value="">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                </select>
            </div>
            </div>
        </div>
        </fieldset>


    <!-- 📊 DataTable -->
    <table id="productTable" class="table table-striped table-bordered table-hover" style="width:100%">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Slug</th>
          <th>Category</th>
          <th>Status</th>
          <th>Images</th>
          <th>Created At</th>
          <th>Actions</th>
        </tr>
      </thead>
    </table>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import ProductServices from "../../services/ProductServices";
import $ from "jquery";

import "datatables.net-bs5";
import "datatables.net-responsive-bs5";
import "bootstrap/dist/css/bootstrap.min.css";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";

export default {
  name: "Product",
  setup() {
    const filters = ref({
      category_id: "",
      status: "",
    });

    let dataTable = null;

    const initTable = () => {
      dataTable = $("#productTable").DataTable({
        serverSide: true,
        processing: true,
        responsive: true,
        searching: true,
        pagingType: "full_numbers",
        lengthMenu: [
            [5, 10, 20, 30,50, 100], 
            [5, 10, 20, 30,50, 100]  
        ],
        ajax: function (data, callback) {
          const params = {
            draw: data.draw,
            start: data.start,
            length: data.length,
            search: data.search.value,
            order: data.order,
            columns: data.columns,
            category_id: filters.value.category_id,
            status: filters.value.status,
          };

          ProductServices.getAll(params).then((res) => {
            callback({
              draw: res.draw,
              recordsTotal: res.recordsTotal,
              recordsFiltered: res.recordsFiltered,
              data: res.data.map((p) => ({
                id: p.id,
                name: p.name,
                slug: p.slug,
                category_id: p.category_id,
                status: p.status,
                created_at: new Date(p.created_at).toLocaleString(),
                images: p.images
                  .map(
                    (img) =>
                      `<img src="${import.meta.env.VITE_API_IMAGE_URL}${img.image}" width="50" class="me-1 rounded"/>`
                  )
                  .join(""),
                actions: `
                  <button class="btn btn-sm btn-success me-1" data-id="${p.id}"><i class="fas fa-edit"></i></button>
                  <button class="btn btn-sm btn-info me-1" data-id="${p.id}"><i class="fas fa-eye text-blue-900"></i></button>
                  <button class="btn btn-sm btn-danger" data-id="${p.id}"><i class="fas fa-trash"></i></button>
                `,
              })),
            });
          });
        },
        columns: [
          { data: "id" },
          { data: "name" },
          { data: "slug" },
          { data: "category_id" },
          { data: "status" },
          { data: "images", orderable: false, searchable: false },
          { data: "created_at" },
          { data: "actions", orderable: false, searchable: false },
        ],
      });
    };

    const reloadTable = () => {
      if (dataTable) {
        dataTable.ajax.reload();
      }
    };

    onMounted(initTable);

    return { filters, reloadTable };
  },
};
</script>
