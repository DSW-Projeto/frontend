<template>
    <div class="Frame-List">
        <v-data-table :disable-sort=false  :headers="headers" :items="screens" :disable-pagination=true
            :hide-default-footer="true"></v-data-table>
    </div>
</template>

<script>
let data1 = new Date(2024, 5, 11)
let data2 = new Date(2024, 4, 10)
let data3 = new Date(2024, 3, 9)

export default {
    name: 'Frame-List',
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
                    divider: true,
                    
                },
            ],
            screens: [
                {
                    autor: 'Thiago Sousa',
                    dataMod: data2.toLocaleDateString('pt-BR'),
                    screenName: 'Teste',
                },
                {
                    autor: 'OWalker',
                    dataMod: data1.toLocaleDateString('pt-BR'),
                    screenName: 'ATeste'
                },
                {
                    autor: 'Pedro',
                    dataMod: data3.toLocaleDateString('pt-BR'),
                    screenName: 'Teste'
                },
                {
                    autor: 'OWalker',
                    dataMod: data1.toLocaleDateString('pt-BR'),
                    screenName: 'ATeste'
                },
                {
                    autor: 'OWalker',
                    dataMod: data1.toLocaleDateString('pt-BR'),
                    screenName: 'ATeste'
                },
                {
                    autor: 'OWalker',
                    dataMod: data1.toLocaleDateString('pt-BR'),
                    screenName: 'ATeste'
                },
                {
                    autor: 'OWalker',
                    dataMod: data1.toLocaleDateString('pt-BR'),
                    screenName: 'ATeste'
                },
                {
                    autor: 'OWalker',
                    dataMod: data1.toLocaleDateString('pt-BR'),
                    screenName: 'ATeste'
                },
                {
                    autor: 'OWalker',
                    dataMod: data1.toLocaleDateString('pt-BR'),
                    screenName: 'ATeste'
                },
                {
                    autor: 'OWalker',
                    dataMod: data1.toLocaleDateString('pt-BR'),
                    screenName: 'ATeste'
                },
                {
                    autor: 'OWalker',
                    dataMod: data1.toLocaleDateString('pt-BR'),
                    screenName: 'ATeste'
                },
                {
                    autor: 'OWalker',
                    dataMod: data1.toLocaleDateString('pt-BR'),
                    screenName: 'ATeste'
                },
                {
                    autor: 'OWalker',
                    dataMod: data1.toLocaleDateString('pt-BR'),
                    screenName: 'ATeste'
                },
                {
                    autor: 'OWalker',
                    dataMod: data1.toLocaleDateString('pt-BR'),
                    screenName: 'ATeste'
                },
                {
                    autor: 'OWalker',
                    dataMod: data1.toLocaleDateString('pt-BR'),
                    screenName: 'ATeste'
                },
                {
                    autor: 'OWalker',
                    dataMod: data1.toLocaleDateString('pt-BR'),
                    screenName: 'ATeste'
                },
                {
                    autor: 'OWalker',
                    dataMod: data1.toLocaleDateString('pt-BR'),
                    screenName: 'ATeste'
                },
                {
                    autor: 'OWalker',
                    dataMod: data1.toLocaleDateString('pt-BR'),
                    screenName: 'ATeste'
                },
                {
                    autor: 'OWalker',
                    dataMod: data1.toLocaleDateString('pt-BR'),
                    screenName: 'ATeste'
                },
                {
                    autor: 'OWalker',
                    dataMod: data1.toLocaleDateString('pt-BR'),
                    screenName: 'ATeste'
                },
                {
                    autor: 'OWalker',
                    dataMod: data1.toLocaleDateString('pt-BR'),
                    screenName: 'ATeste'
                },
                {
                    autor: 'OWalker',
                    dataMod: data1.toLocaleDateString('pt-BR'),
                    screenName: 'ATeste'
                },

            ],
        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../assets/Styles.css';


</style>