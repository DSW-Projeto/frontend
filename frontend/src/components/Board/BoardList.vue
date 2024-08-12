<template>
    <div class="Frame-List">
        <v-data-table :headers="headers" :items="boards" :disable-pagination=true :hide-default-footer="true">
            <template v-slot:item="{ item }">
                <tr>
                    <td @click="goToPage(item.id)">{{ item.screenName }}</td>
                    <td @click="goToPage(item.id)">{{ item.autor }}</td>
                    <td @click="goToPage(item.id)">{{ item.dataMod }}</td>
                </tr>
            </template>
        </v-data-table>
    </div>
</template>

<script>

let data1 = new Date(2024, 8, 9);
let data2 = new Date(2022, 8, 9);
let data3 = new Date(2020, 8, 9);


export default {
    name: 'Frame-List',
    methods: {
        goToPage(id) {
            this.$router.push(`/list/${id}`);
        }
    },
    data() {
        return {
            headers: [
                {
                    text: 'Nome Do Quadro',
                    value: 'screenName',
                    divider: true,
                },
                {
                    text: 'Autor',
                    value: 'autor',
                    divider: true,
                },
                {
                    text: 'Última modificação',
                    value: 'dataMod',

                },
            ],
            boards: [
                {
                    autor: 'Thiago Sousa',
                    dataMod: data2.toLocaleDateString('pt-BR'),
                    screenName: 'Teste',
                    id: 1
                },
                {
                    autor: 'OWalker',
                    dataMod: data1.toLocaleDateString('pt-BR'),
                    screenName: 'ATeste',
                    id: 2
                },
                {
                    autor: 'Pedro',
                    dataMod: data3.toLocaleDateString('pt-BR'),
                    screenName: 'Teste',
                    id: 3
                },
            ],
        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../../assets/Styles.css';

td:hover {
    background-color: var(--background-dark);
    cursor: pointer;
}
</style>