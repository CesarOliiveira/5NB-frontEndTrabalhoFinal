export const theme = {
    colors: {
        primary: '#4A90E2',      // Azul principal
        secondary: '#64B5F6',    // Azul claro
        gradient: {
            start: '#2196F3',    // Azul médio
            end: '#03A9F4'       // Azul claro
        },
        text: {
            primary: '#2D3748',   // Cinza escuro
            secondary: '#718096', // Cinza médio
            light: '#FFFFFF'      // Branco
        },
        background: {
            main: '#FFFFFF',      // Branco
            input: '#F7FAFC',     // Cinza muito claro
            card: '#FFFFFF'       // Branco para cards
        },
        accent: '#4FC3F7',       // Azul mais claro para destaque
        success: '#48BB78',      // Verde para sucesso
        warning: '#F6E05E',      // Amarelo para avisos
        error: '#F56565'         // Vermelho para erros
    },
    spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
        xxl: 48
    },
    borderRadius: {
        sm: 4,
        md: 8,
        lg: 12,
        xl: 20,
        full: 9999
    },
    shadows: {
        sm: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.18,
            shadowRadius: 1.0,
            elevation: 1
        },
        md: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5
        },
        lg: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.30,
            shadowRadius: 4.65,
            elevation: 8
        }
    }
}; 