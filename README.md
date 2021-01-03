#Infinity Scroll

Import InfinityScroll.vue to your component and then wrap the element you want to have infinty scroll in it.. 

Example Usage: 

	<InfinityScroll
				triggerId="listContainer"
				loader="bars"
				loadingText="Loading..."
				background="#03045e"
				@onBottom="loadData"
	>
	<UserCard v-for="(user, idx) in fakeData" :user="user" :key="user.id" />
	</InfinityScroll>
  
 
  
  The component accepts the following props: 
  
  1) triggerId (Requird) -  uniqu scroll container id for multiply infintyScroll components ..  will be on a div wrapping your content and playing as the 
                  element with the scroll.. 
      
  2) loader (optimal, default - 'bars') - customizeable Loader styles, you can choose from : https://samherbert.net/svg-loaders/ 
                                          just pass the name of the loader.. 
                                          
  3) loadingText (optimal, default - 'Loading...') - Custom message notification for the user when the component is loading data..
  4) background (optimal, default - 'black') - Custom background for the loader
  5) onBottom (Required)- the event you want to fire when the container have reached the bottom..
  
  ##your elements must be injected direcly between the opening and the closing tags, dont wrap then with other divs.. otherwise the component wont be
    able to recognize the correct container to overflow .. 
      
