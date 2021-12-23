<template>
  <nav>
    <ul>
      <li>
        <a href="/logout">Выйти</a>
      </li>
    </ul>
  </nav>
  <table class="attendance_table">
    <thead>
      <tr>
        <th>Фамилия</th>
        <th>Имя</th>
        <th>Группа</th>
        <th>Сканнер</th>
        <th>Дата</th>
        <th>Пришел</th>
        <th>Ушел</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in list" :key="item.id">
        <td>
          {{ item.user.last_name }}
        </td>
        <td>
          {{ item.user.first_name }}
        </td>
        <td>
          {{ item.user.group_user.name }}
        </td>
        <td>
          {{ item.scanner.username }}
        </td>
        <td>
          {{ item.date }}
        </td>
        <td>
          {{ item.time_come }}
        </td>
        <td>
          {{ item.time_gone }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapActions } from "vuex";
// @ is an alias to /src

export default {
  components: {},
  data() {
    return {
      list: [],
    };
  },
  methods: {
    ...mapActions({
      attendanceList: "attendanceList",
    }),
    getAttendanceList() {
      this.attendanceList().then((data) => {
        if (data.status == 200) {
          this.list = data.attendanceList;
        }
        console.log(this.list);
      });
    },
  },
  mounted() {
    this.getAttendanceList();
  },
};
</script>
<style lang="scss">
.attendance_table {
  &,
  thead,
  tbody,
  td,
  th,
  tr {
    border: 1px solid #000;
  }
}
</style>