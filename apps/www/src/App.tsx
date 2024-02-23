import { useButton, useField, useModal, useToast } from "useui-ts/hooks";

function App() {
  const modal = useModal();
  const [{ ...fieldProps }, { Field }] = useField();

  const toast = useToast();

  const [confirmProps, { Button: ConfirmButton }] = useButton({
    onClick: () =>
      modal.open("confirm-modal", {
        title: "Confirm",
        size: "xs",
        content: (
          <button onClick={() => modal.close("confirm-modal")}>Close</button>
        ),
      }),
  });

  const [sendProps, { Button: SendButton }] = useButton({
    onClick: () =>
      modal.open("second-modal", {
        title: "hello 2",
        size: "sm",
        content: (
          <>
            <button onClick={() => modal.close("second-modal")}>Close</button>
            <ConfirmButton {...confirmProps}>Confirm</ConfirmButton>
          </>
        ),
      }),
  });
  const [btnProps, { Button }] = useButton({
    onClick: () =>
      modal.open("first-modal", {
        size: "lg",
        title: "hello",
        content: (
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
            nulla rerum voluptatibus provident deserunt, natus laborum, minus
            nobis non similique soluta necessitatibus voluptate aut veritatis
            dolorem cum dolores! Tenetur voluptate nesciunt laboriosam aliquid
            eos, exercitationem neque quo harum debitis expedita fugit ea minima
            tempora officiis, aut quae laborum autem iure! Porro facilis ad
            deserunt libero nihil officia nisi enim aspernatur ipsum nostrum
            distinctio dolor, mollitia eos repellat similique ex quisquam
            dolorum corporis rem accusantium! At, omnis possimus. Et ad
            consequuntur commodi ea consequatur rem velit ipsa accusantium, esse
            quasi laudantium porro nulla voluptatibus, aspernatur facilis quod
            odit quam. Nulla aut animi facere cumque voluptatibus, a tempora
            doloribus optio perferendis enim aliquam deserunt ipsum quae dicta
            laboriosam magnam tempore nesciunt similique illo! Ab, repellendus
            illo! Laudantium vitae non natus explicabo delectus dolorum ipsam
            voluptatem dolorem minima quisquam, dolores cum vel libero.
            Laudantium inventore error voluptates aliquam quasi adipisci
            obcaecati sint iure dignissimos. Nihil excepturi officia est
            sapiente dolore provident ab autem, dolores nobis, magni nam aliquam
            perferendis fugit assumenda tenetur, ut harum maxime illum deserunt
            quis eligendi porro. Natus eos sed porro? Dolorem totam, esse
            aliquam provident magni dolores sapiente, laboriosam doloremque
            fugiat laudantium inventore numquam libero asperiores expedita, ad
            odio velit. Molestias, quia et nobis repellendus consequatur quasi
            vero quas enim sapiente. Autem inventore sapiente animi incidunt
            ipsam culpa expedita aperiam modi, reprehenderit ipsa doloribus ea
            pariatur unde molestias at voluptatum laboriosam deleniti omnis
            perspiciatis magni voluptatem nostrum cumque iste. Id quas eum
            soluta officiis. Fugit eum quae culpa voluptas a est saepe, itaque
            repellat eligendi voluptate temporibus quia minima velit officiis
            porro alias repudiandae? Iusto quis velit voluptatem autem
            obcaecati, laborum non neque in cum at ducimus nobis. Nisi rem
            ratione minus ea commodi ex perferendis, voluptatem laboriosam eos
            tempore aspernatur, optio consequatur quae dolorem amet esse maiores
            iusto ducimus sit velit labore cumque consequuntur. Sapiente
            voluptates, earum, facilis corporis cum quod architecto ab iusto
            laudantium eius voluptas tempora asperiores molestias, at maxime
            ipsam! Voluptatum quod, praesentium molestias sed cum libero
            aspernatur at repellendus eaque vero minus animi alias tempore
            consequatur, laborum pariatur error quasi voluptatibus voluptatem
            sequi. Accusamus in rerum nulla, delectus optio officiis! Ducimus
            itaque doloremque quidem nisi tempora deserunt veniam odit explicabo
            commodi provident ullam omnis fugiat eligendi, atque modi totam.
            Error quam tempora quas expedita modi. Quod beatae, modi deleniti
            quasi cupiditate in, quis et impedit provident itaque animi
            blanditiis doloribus, mollitia ab? Praesentium, aspernatur
            laudantium aliquid molestias aut quibusdam quaerat fugit delectus
            sit suscipit beatae dolorem, quia hic tenetur id quo aliquam
            veritatis, recusandae earum illo molestiae? Placeat recusandae
            officiis beatae aspernatur at voluptates nesciunt dolorum
            accusantium distinctio cumque sit exercitationem earum blanditiis,
            quo harum provident reprehenderit sapiente vero? Reprehenderit neque
            maiores eaque dolorem magnam. Nobis fugit eveniet tenetur id enim.
            Reiciendis quis adipisci cupiditate sunt debitis omnis neque, ab
            ipsam? Ullam possimus eveniet maiores beatae. Perspiciatis incidunt
            et consequatur nulla quidem qui sit asperiores maiores facilis
            tempore laudantium perferendis impedit ratione temporibus sed porro
            dicta tenetur corrupti, in quos omnis saepe possimus at.
          </div>
        ),
        bottomNavigationBar: {
          justifyBetween: true,
          items: [
            <SendButton {...sendProps}>Send</SendButton>,
            <button onClick={() => modal.close("first-modal")}>Cancel</button>,
          ],
        },
      }),
  });

  const [btnProps2, { Button: Two }] = useButton({
    onClick: () =>
      toast({
        title: "Uh No! Something went wrong",
        description: "There was a problet with your request",
        variant: "info",
      }),
  });

  return (
    <>
      <Field {...fieldProps} className="hello" />
      <Button {...btnProps}>hello</Button>
      <Two {...btnProps2}>Two</Two>
    </>
  );
}

export default App;
