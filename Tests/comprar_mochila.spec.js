// 1 - Referências e bibliotecas
// Declara um obejto chamado test vindo da biblioteca Playwright
const { test, expect } = require('@playwright/test')

// 2 Classe ou Funções ou Métódos 
// Um script pode executar de forma:
// - Sincrona: Simultâneo. Ex.: Ligação de Voz
// - Assincrona: Separado. Ex.: mensagem de texto no Whatsapp
// testes 4
   test('Realizar o fluxo de compra da mochila', async ({page}) => {
    
    await page.goto('/') // abre o browser no site alvo
    await expect(page).toHaveURL('/')            // verifica se está na página raiz
    const botao_login = page.locator('#login-button')
    await expect(botao_login).toHaveText('Login') //
    
    // Página inicia Realizar o login
    // Preencher o campo cujo localizador é name com o valor standard_user
    await page.fill('[name="user-name"]', 'standard_user')
    // Preencher o campo cujo localizador é cssSelector com o valor secret_sauce
    await page.fill('[placeholder="Password"]', 'secret_sauce')
    // Clicar no botão Login
    await botao_login.click()
    //await page.locator(#login-button).click() uma outra forma de testar o botão, a linha 22 so foi feita pq ja tinha declarado na linha 13

     // Página de Inventário / Produtos
     //Verificar se esta na pagina certa
     
    await expect(page).toHaveURL(/.*inventory/)
    // Se precisar mudar de valor 2 ou mais vezes
    // Trocar de const(constante) para let (variavel)
    const titulosecao = 'span.title'
    await expect(page.locator('span.title')).toHaveText('Products') //cssSelector

    // Adicionar a mochila no carrinho
    //await expect(page.locator('button.btn.btn_primary'),'Add to cart')
    const btnAdicionar = 'xpath=/html/body/div[1]/div/div/div[2]/div/div/div/div[1]/div[2]/div[2]/button'
    await page.locator(btnAdicionar).click()

    // Verificar se exibe o n° 1 no carrinho de compras
    const icoQuantCart = 'Span.shopping_cart_badge' // cssSelector
    // const icoQuantCart = '#shopping_cart_container . a' // Seletor
    await expect(page.locator(icoQuantCart)).toHaveText('1')

    // clicar no icone do carrinho (n°1)
    await page.locator(icoQuantCart).click()
          
    // Espera de 1 segundo
    await page.waitForTimeout(1000) // mal visto // alfinete // temporária

    // Verificar se esta na página certa Cart
    await expect(page).toHaveURL(/.*cart/)
    //tituloSecao = 'Span.title' // cssSelector
    // titulosecao permanece igual ao da pagina Inventory'
    await expect(page.locator(titulosecao)).toHaveText('Your Cart') //cssSelector

    // Verificar dados funcionais
    await expect(page.locator('.cart_quantity')).toHaveText('1')
    await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack')
    await expect(page.locator('.inventory_item_price')).toHaveText('$29.99')


    //Excluir item do carrinho
    //await expect(page.locator(icoQuantCart)).toHaveText('1')
    //await page.click('#remove-sauce-labs-backpack')
    //await expect(page.locator('div[data-test="shopping-cart-link"]').toHaveText('')) Não consegui validar o item do carrinho zerado
    
    //await page.click('#remove-sauce-labs-backpack')
    //await expect(page.locator(icoQuantCart)).toHaveText('')

    //Clicar no botão Checkout
    await page.click('button[data-test="checkout"]')
    
    //Validar informação da página de Checkout
    await expect(page).toHaveURL(/.*checkout-step-one/)
    await expect(page.locator(titulosecao)).toHaveText('Checkout: Your Information')

    //Preenchendo os campos do formulário
    await page.fill('[placeholder="First Name"]', 'Robson')
    await page.fill('[data-test="lastName"]', 'Oliveira')
    await page.fill('[data-test="postalCode"]', '06033180')
    await page.waitForTimeout(1000) // mal visto // alfinete // temporária
    
    //Exemplos de seletores para o botão continue
    // await page.click('#continue')
    // await page.click('input.submit-button.btn.btn_primary.cart_button.btn_action') // CssSelector
    // await page.click([]name"continue"]')
    await page.click('input[name="continue"]') 

    //Validar informação da página de Overview
    await expect(page).toHaveURL(/.*checkout-step-two/)
    await expect(page.locator(titulosecao)).toHaveText('Checkout: Overview')
    await expect(page.locator('.cart_quantity')).toHaveText('1')
    await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack')
    await expect(page.locator('.inventory_item_price')).toHaveText('$29.99')
    await expect(page.locator('div[data-test="payment-info-value"]')).toHaveText('SauceCard #31337')
    await expect(page.locator('div[data-test="shipping-info-value"]')).toHaveText('Free Pony Express Delivery!')
    await expect(page.locator('div[data-test="subtotal-label"]')).toHaveText('Item total: $29.99')
    await expect(page.locator('div[data-test="tax-label"]')).toHaveText('Tax: $2.40')
    await expect(page.locator('div[data-test="total-label"]')).toHaveText('Total: $32.39')
    await page.click('button[data-test="finish"]')
    await page.waitForTimeout(1000) // mal visto // alfinete // temporária

    // Validar a pagina final de compras
    await expect(page).toHaveURL(/.*checkout-complete/)
    await expect(page.locator(titulosecao)).toHaveText('Checkout: Complete!')
    //await expect(page.locator('h2[data-test="complete-header"]')).toHaveText('Thank you for your order!')
    await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!')
    await expect(page.locator('div[data-test="complete-text"]')).toHaveText('Your order has been dispatched, and will arrive just as fast as the pony can get there!')
    await page.waitForTimeout(1000) // mal visto // alfinete // temporária
}) // final do teste