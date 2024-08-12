<template>
    <div class="col">
        <div>
            <h1>{{ title }}</h1>
        </div>
        <div>
            <v-card class="mx-auto" max-width="344" outlined>
                <v-list-item three-line>
                    <v-list-item-content>
                        <div class="text-overline mb-4">
                            OVERLINE
                        </div>
                        <v-list-item-title class="text-h5 mb-1">
                            Headline 5
                        </v-list-item-title>
                        <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar>
                </v-list-item>

                <v-card-actions>
                    <v-btn outlined rounded text>
                        Button
                    </v-btn>
                </v-card-actions>
            </v-card>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BoardCol',
    data() {
        return {
            title: 'testando isso'
        }
    }
}
</script>


<style scoped>
@import '../../assets/Styles.css';

.col {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: var(--texto);
}
</style>
